import axiosInstance from './apiClient';
import axios from 'axios';
import type { AxiosError } from 'axios';
import type { BookRentalResponse } from '../types/bookApi';


export const requestBookRentalSafe = async (
  bookId: number | string
): Promise<BookRentalResponse> => {
  try {
    const res = await axiosInstance.patch<BookRentalResponse>(
      `http://13.124.75.92:8080/api/book/${bookId}`,
      {}
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    // 책을 찾을 수 없는 경우
    if (error.response?.status === 404) {
      throw new Error('존재하지 않는 도서입니다.');
    }

    // 그 외 에러 공통 처리
    throw new Error('도서 대여 요청 중 오류가 발생했습니다.');
  }
};


interface ReservationResponse<T = string> {
  status: string;      // "CREATED" 기대
  message: string;     // "successfully reservation book"
  data: T;             // 현재 스펙상 ""
}

/**
 * 도서 예약 요청 API
 * METHOD: PATCH /api/book/reservation
 * QueryString: reservationNumber
 * Body: {}
 * Auth: Bearer Token (axiosInstance 인터셉터로 자동 처리)
 */
export async function requestBookReservation(
  reservationNumber: string,
): Promise<ReservationResponse> {
  if (!reservationNumber) {
    throw new Error('예약 번호가 존재하지 않습니다.');
  }

  try {
    const res = await axiosInstance.patch<ReservationResponse>(
      '/api/book/reservation',
      {},
      {
        params: { reservationNumber }, // → ?reservationNumber=XXX
      },
    );

    // 응답 형식에 맞춰 기본 검증
    if (res.data.status !== 'CREATED') {
      throw new Error(res.data.message || '도서 예약에 실패했습니다.');
    }

    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404) {
        throw new Error('해당 도서를 찾을 수 없습니다. (404)');
      }

      if (status === 401) {
        throw new Error('로그인 후 이용 가능한 서비스입니다. (401)');
      }

      const apiMessage =
        (error.response?.data as any)?.message ||
        '도서 예약 요청 중 오류가 발생했습니다.';

      throw new Error(apiMessage);
    }

    throw new Error('도서 예약 중 알 수 없는 오류가 발생했습니다.');
  }
}
