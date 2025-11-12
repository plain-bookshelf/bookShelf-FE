import axiosInstance from "./apiClient";
import axios, { AxiosError } from "axios";
import type { BookRentalResponse } from "../types/bookApi";

/** 도서 대여 요청: PATCH /api/book/{bookId} */
export const requestBookRentalSafe = async (
  bookId: number | string
): Promise<BookRentalResponse> => {
  try {
    const res = await axiosInstance.patch<BookRentalResponse>(
      `book/${bookId}`,
      {}
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError;

    if (error.response?.status === 404) {
      throw new Error("존재하지 않는 도서입니다.");
    }

    throw new Error("도서 대여 요청 중 오류가 발생했습니다.");
  }
};

interface ReservationResponse<T = string> {
  status: string;
  message: string;
  data: T;
}

/** 도서 예약: PATCH /api/book/reservation?reservationNumber=xxx */
export async function requestBookReservation(
  reservationNumber: string
): Promise<ReservationResponse> {
  if (!reservationNumber) {
    throw new Error("예약 번호가 존재하지 않습니다.");
  }

  try {
    const res = await axiosInstance.patch<ReservationResponse>(
      "book/reservation",
      {},
      {
        params: { reservationNumber },
      }
    );

    if (res.data.status !== "CREATED") {
      throw new Error(res.data.message || "도서 예약에 실패했습니다.");
    }

    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 404) {
        throw new Error("해당 도서를 찾을 수 없습니다. (404)");
      }
      if (status === 401) {
        throw new Error("로그인 후 이용 가능한 서비스입니다. (401)");
      }

      const apiMessage =
        (error.response?.data as any)?.message ||
        "도서 예약 요청 중 오류가 발생했습니다.";
      throw new Error(apiMessage);
    }

    throw new Error("도서 예약 중 알 수 없는 오류가 발생했습니다.");
  }
}