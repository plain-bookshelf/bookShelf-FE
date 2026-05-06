import { instance } from "./axios";
import { storage, ACCESS_TOKEN_KEY } from "../utils/tokenService";

type PlatformType = "WEB" | "ANDROID" | "IOS";

interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

interface PagedResponse<T> {
  content: T[];
  is_last_page: boolean;
}

export interface RentalRequestStreamItem {
  book_detail_id: number;
  member_id: number;
  nick_name: string;
  title: string;
  call_number: string;
}

export interface RentalStatusApiItem {
  member_id: number;
  book_detail_id: number;
  book_affiliation_id?: number;
  bookAffiliationId?: number;
  title: string;
  publisher: string;
  nickname: string;
  call_number: string;
  return_date: string;
  is_overdue: boolean;
  registration_number?: string;
  registrationNumber?: string;
}

interface RequestSnapshotPayload {
  requests: RentalRequestStreamItem[];
}

interface RequestCheckStreamOptions {
  lastEventId?: string;
  onSnapshot: (requests: RentalRequestStreamItem[]) => void;
  onError?: (error: Error) => void;
  platformType?: PlatformType;
  signal?: AbortSignal;
}

const normalizeBaseUrl = (url?: string) => url?.trim().replace(/^"|"$/g, "").replace(/\/+$/, "");

const getBaseUrl = () => normalizeBaseUrl(instance.defaults.baseURL) ?? "";

const parseEventBlock = (block: string) => {
  const lines = block.split(/\r?\n/);
  let event = "";
  let id = "";
  const data: string[] = [];

  for (const line of lines) {
    if (!line || line.startsWith(":")) continue;

    if (line.startsWith("event:")) {
      event = line.slice(6).trim();
      continue;
    }

    if (line.startsWith("id:")) {
      id = line.slice(3).trim();
      continue;
    }

    if (line.startsWith("data:")) {
      data.push(line.slice(5).trimStart());
    }
  }

  return {
    event,
    id,
    data: data.join("\n"),
  };
};

/**
 * Authorization header가 필요한 관리자 SSE를 fetch 스트림으로 직접 파싱한다.
 */
export const connectRequestCheckStream = async ({
  lastEventId,
  onSnapshot,
  onError,
  platformType = "WEB",
  signal,
}: RequestCheckStreamOptions) => {
  const baseUrl = getBaseUrl();
  const url = new URL("/request-check", `${baseUrl}/`);
  url.searchParams.set("platformType", platformType);

  const accessToken = storage.getItem(ACCESS_TOKEN_KEY);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "text/event-stream",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(lastEventId ? { "Last-Event-ID": lastEventId } : {}),
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`REQUEST_STREAM_FAILED:${response.status}`);
  }

  if (!response.body) {
    throw new Error("REQUEST_STREAM_UNAVAILABLE");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const blocks = buffer.split(/\r?\n\r?\n/);
      buffer = blocks.pop() ?? "";

      for (const block of blocks) {
        const parsed = parseEventBlock(block);

        if (parsed.event !== "rental-request-snapshot" || !parsed.data) {
          continue;
        }

        try {
          const payload = JSON.parse(parsed.data) as RequestSnapshotPayload;
          onSnapshot(payload.requests ?? []);
        } catch (error) {
          onError?.(error instanceof Error ? error : new Error(String(error)));
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
};

export const getRentalStatusPage = async (page: number, size = 100) => {
  const response = await instance.get<ApiResponse<PagedResponse<RentalStatusApiItem>>>("/rentalStatusCheck", {
    params: { page, size },
  });

  return response.data.data;
};

export const searchRentalStatusPage = async (page: number, size = 100, nickname = "") => {
  const response = await instance.get<ApiResponse<PagedResponse<RentalStatusApiItem>>>(
    "/rentalStatusCheck/searchMember",
    {
      params: { page, size, nickname },
    },
  );

  return response.data.data;
};

/**
 * 기존 승인 API 경로는 프로젝트에 이미 사용 중인 규칙을 유지한다.
 */
export const patchRentalAllow = async (bookDetailId: string | number) => {
  return await instance.patch(`/api/approve/${bookDetailId}`);
};

/**
 * 명세서 기준 반납 API.
 * book_affiliation_id가 없으면 호출부에서 book_detail_id를 대체값으로 넘기게 된다.
 */
export const patchBookReturn = async (bookAffiliationId: string | number) => {
  if (bookAffiliationId === "" || bookAffiliationId === null || bookAffiliationId === undefined) {
    throw new Error("BOOK_AFFILIATION_ID_MISSING");
  }

  return await instance.patch(`/return/${bookAffiliationId}`);
};

/**
 * Legacy admin 화면 호환용 exports.
 */
export const getAllowList = async (page: number) => {
  return await instance.get(`/manage/approval-page?page=${page}`);
};

export const getRentalList = async (page: number) => {
  return await instance.get(`/manage/rental-status?page=${page}`);
};

export const getOverdueList = async (page: number) => {
  return await instance.get(`/manage/rental-status/overdue?page=${page}`);
};

export const getUserSearch = async (nickName: string) => {
  return await instance.get(`/manage/rental-status/nickname?nickName=${nickName}`);
};

export const patchBookRetrun = patchBookReturn;
