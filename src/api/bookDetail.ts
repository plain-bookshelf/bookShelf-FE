import type { BookDetailData, CollectionItem, Comment } from "../types/bookTypes";
import axios from "axios";
import undefindImg from "../assets/undefindImg.png";
import { getAccessToken } from "../utils/tokenService";
import axiosInstance from "./apiClient";

interface CollectionInfoDto {
  affiliation: string;
  registration_number: string;
  call_number: string;
  rental_status: boolean;
}

interface BookDetailApiData {
  book_id: number;
  book_name: string;
  publisher: string | null;
  book_image_url: string | null;
  book_introduction: string | null;
  book_type: string | null;
  book_date: string | null;
  like_count: number;
  collection_information_response_dtos: CollectionInfoDto[];
  review_response_dtos: unknown[];
}

interface BookDetailApiResponse {
  status: string;
  message: string;
  data: BookDetailApiData;
}

type ReviewDto = Record<string, unknown>;

const mapCollection = (dtos: CollectionInfoDto[]): CollectionItem[] =>
  dtos.map((item) => ({
    id: item.registration_number,
    library: item.affiliation,
    callNumber: item.call_number,
    status: item.rental_status,
    dueDate: undefined,
  }));

const toRecord = (value: unknown): ReviewDto =>
  typeof value === "object" && value !== null ? (value as ReviewDto) : {};

const pick = (dto: ReviewDto, keys: string[]) => {
  for (const key of keys) {
    const value = dto[key];
    if (value !== undefined && value !== null) {
      return value;
    }
  }
  return undefined;
};

const mapReviewDtosToComments = (dtos: unknown[] = []): Comment[] => {
  return dtos.map((review, index) => {
    const dto = toRecord(review);
    const id = pick(dto, ["id", "commentId", "comment_id", "reviewId", "review_id", "reviewID"]);

    return {
      id: typeof id === "number" || typeof id === "string" ? id : `temp-${Date.now()}-${index}`,
      userId: String(pick(dto, ["userId", "member_id", "memberId"]) ?? ""),
      user: String(pick(dto, ["user", "member_nick_name", "nickName", "name"]) ?? "사용자"),
      text: String(pick(dto, ["text", "content", "review_content"]) ?? ""),
      date: String(pick(dto, ["date", "created_at", "createdAt"]) ?? new Date().toISOString()),
      likes: Number(pick(dto, ["likes", "like_count", "likeCount"]) ?? 0),
      profileImg: (pick(dto, ["profileImg", "member_profile", "profile_url"]) as string | undefined) ?? undefined,
    };
  });
};

const mapToBookDetailData = (data: BookDetailApiData): BookDetailData => {
  const collection = mapCollection(data.collection_information_response_dtos);
  const reviews = Array.isArray(data.review_response_dtos)
    ? mapReviewDtosToComments(data.review_response_dtos)
    : [];

  return {
    bookId: data.book_id,
    title: data.book_name,
    coverImage: data.book_image_url ?? undefindImg,
    author: "",
    publisher: data.publisher ?? "",
    pubYear: data.book_date ? Number(data.book_date.slice(0, 4)) : undefined,
    registrationId: collection[0]?.id ?? "",
    releaseDate: data.book_date ?? "",
    summary: data.book_introduction ?? "등록된 소개가 없습니다.",
    categories: data.book_type ? [data.book_type] : [],
    collection,
    review_response_dtos: reviews,
  };
};

export const getBookDetail = async (bookId: number | string): Promise<BookDetailData> => {
  console.log("[getBookDetail] called", bookId);

  const token = getAccessToken();
  if (!token) {
    throw new Error("NO_TOKEN");
  }

  try {
    const res = await axiosInstance.get<BookDetailApiResponse>(`/book/${bookId}`);

    if (!res.data || res.data.status !== "OK" || !res.data.data) {
      throw new Error("INVALID_RESPONSE");
    }

    return mapToBookDetailData(res.data.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401) throw new Error("UNAUTHORIZED");
      if (status === 404) throw new Error("NOT_FOUND");
    }

    throw new Error("FETCH_FAILED");
  }
};

