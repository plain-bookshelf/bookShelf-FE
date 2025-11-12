export interface CollectionInfoDto {
  affiliation: string;           // 소속(학교)
  registration_number: string;   // 등록번호
  call_number: string;           // 청구기호
  rental_status: boolean;        // true: 대출중, false: 대출가능
}

export interface BookDetailApiData {
  book_id: number;
  book_name: string;
  publisher: string | null;
  book_image_url: string | null;
  book_introduction: string | null;
  book_type: string | null;      // 카테고리
  book_date: string | null;      // 발매일(또는 출간일)
  like_count: number;
  collection_information_response_dtos: CollectionInfoDto[];
  review_response_dtos: unknown[];   // 나중에 필요하면 타입 정의
}

export interface BookDetailApiResponse {
  status: 'OK';
  message: string;
  data: BookDetailApiData;
}