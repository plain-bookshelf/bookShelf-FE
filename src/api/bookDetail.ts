import axiosInstance from './apiClient';
import type { BookDetailData, CollectionItem } from '../types/bookTypes';

// 백엔드 응답 타입
interface CollectionInfoDto {
  affiliation: string;
  registration_number: string;
  call_number: string;
  rental_status: boolean; // true: 대출중, false: 대출가능
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
  review_response_dtos: any[];
}

interface BookDetailApiResponse {
  status: string; // "OK"
  message: string;
  data: BookDetailApiData;
}

// API 응답 → 프론트에서 쓰는 CollectionItem으로 매핑
const mapCollection = (
  dtos: CollectionInfoDto[],
): CollectionItem[] =>
  dtos.map((item) => ({
    id: item.registration_number,
    library: item.affiliation,
    callNumber: item.call_number,
    status: item.rental_status ? '대출중' : '대출가능',
    // 반납 예정일 필드가 응답에 없으니 필요 시 나중에 추가
    dueDate: undefined,
  }));

// API 응답 → BookDetailData로 매핑
const mapToBookDetailData = (data: BookDetailApiData): BookDetailData => {
  const collection = mapCollection(data.collection_information_response_dtos);

  return {
    bookId: data.book_id,
    title: data.book_name,
    coverImage: data.book_image_url ?? '/images/default-book-cover.png',
    author: '', // 스펙에 없음 → 필요하면 백엔드에 추가 요청
    publisher: data.publisher ?? '',
    pubYear: data.book_date ? Number(data.book_date.slice(0, 4)) : undefined,
    registrationId: collection[0]?.id ?? '',
    releaseDate: data.book_date ?? '',
    summary: data.book_introduction ?? '등록된 소개가 없습니다.',
    categories: data.book_type ? [data.book_type] : [],
    collection,
  };
};

// 실제로 호출해서 BookDetailData를 반환하는 함수
export const getBookDetail = async (
  bookId: number | string,
): Promise<BookDetailData> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    // 여기서 바로 로그인 페이지 보내거나, 호출한 쪽에서 처리하게 그냥 throw
    throw new Error('NO_TOKEN');
  }

  try {
    const res = await axiosInstance.get<BookDetailApiResponse>(
      `/book/${bookId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,        // 🔐 Bearer 토큰 필수
          'Content-Type': 'application/json',
        },
      },
    );

    if (res.data.status !== 'OK' || !res.data.data) {
      throw new Error('INVALID_RESPONSE');
    }

    return mapToBookDetailData(res.data.data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('NOT_FOUND');
    }
    if (error.response?.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    throw new Error('FETCH_FAILED');
  }
};


interface BookLikeResponse {
  status: "CREATED";
  message: string;
  data: boolean; // true면 좋아요 반영 성공
}

export const likeBook = async (bookId: number | string): Promise<boolean> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    // 호출한 쪽에서 로그인 유도할 수 있게 에러 던짐
    throw new Error("NO_TOKEN");
  }

  try {
    const res = await axiosInstance.post<BookLikeResponse>(
      `/book/${bookId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 Bearer 토큰 필수
          "Content-Type": "application/json",
        },
      }
    );

    // 스펙: 201 CREATED + status: "CREATED"
    if (res.status !== 201 || res.data.status !== "CREATED") {
      throw new Error("INVALID_RESPONSE");
    }

    return res.data.data; // true 기대
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("NOT_FOUND"); // 존재하지 않는 도서
    }
    if (error.response?.status === 401) {
      throw new Error("UNAUTHORIZED"); // 로그인 필요 or 토큰 만료
    }
    throw new Error("LIKE_FAILED"); // 그 외 에러
  }
};