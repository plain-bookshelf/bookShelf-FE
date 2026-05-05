import axios from "axios";
import axiosInstance from "./apiClient";

// 댓글 작성, 좋아요, 삭제 API

/** 댓글 작성 응답 (201 CREATED) */
export interface CommentWriteResponse {
  status: "CREATED";
  message: string;
  data: string;
}

/** 댓글 좋아요 응답 (201 CREATED) */
export interface CommentLikeResponse {
  status: "CREATED";
  message: string;
  data: boolean;
}

/** 댓글 삭제 응답 (204 NO_CONTENT) */
export interface CommentDeleteResponse {
  status: "NO_CONTENT";
  message: string;
  data: string;
}

const COMMENT_BASE = "/api/book/comment";

/** 댓글 작성: POST /api/book/comment/write?bookId= */
export const postCommentWrite = async (
  bookId: number | string,
  chat: string
): Promise<CommentWriteResponse> => {
  if (!bookId && bookId !== 0) {
    throw new Error("bookId가 필요합니다.");
  }

  if (!chat || !chat.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  try {
    const res = await axiosInstance.post<CommentWriteResponse>(
      `${COMMENT_BASE}/write`,
      { chat },
      {
        params: { bookId },
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.status === 201 && res.data?.status === "CREATED") {
      return res.data;
    }

    throw new Error(res.data?.message || "댓글 작성 중 알 수 없는 오류가 발생했습니다.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 404) {
        throw new Error(message || "도서 정보를 찾을 수 없습니다.");
      }

      if (message) {
        throw new Error(message);
      }
    }

    throw new Error("댓글 작성 요청 중 오류가 발생했습니다.");
  }
};

/** 댓글 좋아요: POST /api/book/comment/like?commentId= */
export const postCommentLike = async (
  commentId: number | string
): Promise<CommentLikeResponse> => {
  if (!commentId && commentId !== 0) {
    throw new Error("commentId가 필요합니다.");
  }

  try {
    const res = await axiosInstance.post<CommentLikeResponse>(
      `${COMMENT_BASE}/like`,
      {},
      {
        params: { commentId },
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.status === 201 && res.data?.status === "CREATED" && res.data?.data === true) {
      return res.data;
    }

    throw new Error(res.data?.message || "댓글 좋아요 처리 중 알 수 없는 오류가 발생했습니다.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 400) throw new Error("회원 정보가 올바르지 않습니다.");
      if (status === 404) throw new Error("댓글 정보를 찾을 수 없습니다.");
      if (apiMessage) throw new Error(apiMessage);
    }

    throw new Error("댓글 좋아요 요청 중 오류가 발생했습니다.");
  }
};

/** 댓글 삭제: PATCH /api/book/comment/delete?commentId= */
export const deleteComment = async (
  commentId: number | string
): Promise<CommentDeleteResponse> => {
  if (!commentId && commentId !== 0) {
    throw new Error("commentId가 필요합니다.");
  }

  try {
    const res = await axiosInstance.patch<CommentDeleteResponse>(
      `${COMMENT_BASE}/delete`,
      {},
      {
        params: { commentId },
        headers: { "Content-Type": "application/json" },
      }
    );

    // 서버는 204만 주거나, 204와 함께 body를 줄 수 있어서 둘 다 허용한다.
    if (res.status === 204) {
      return (
        res.data || {
          status: "NO_CONTENT",
          message: "successfully comment deleted",
          data: "",
        }
      );
    }

    // 혹시 200/201로 내려와도 data.status 기준으로 한 번 더 허용한다.
    if (res.data?.status === "NO_CONTENT") {
      return res.data;
    }

    throw new Error(res.data?.message || "댓글 삭제 처리 중 알 수 없는 오류가 발생했습니다.");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 400) throw new Error("회원 정보가 올바르지 않습니다.");
      if (status === 404) throw new Error("댓글 정보를 찾을 수 없습니다.");
      if (apiMessage) throw new Error(apiMessage);
    }

    throw new Error("댓글 삭제 요청 중 오류가 발생했습니다.");
  }
};
