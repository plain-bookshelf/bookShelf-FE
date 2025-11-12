import axios from "axios";
import axiosInstance from "./apiClient";

/** 댓글 작성 응답 */
export interface CommentWriteResponse {
  status: "CREATED";
  message: string;
  data: string; // 보통 ""
}

/** 댓글 좋아요 응답 */
export interface CommentLikeResponse {
  status: "CREATED";
  message: string;
  data: boolean; // true = 좋아요 처리 성공
}

/** 댓글 삭제 응답 */
export interface CommentDeleteResponse {
  status: "NO_CONTENT";
  message: string;
  data: string; // ""
}

/** 댓글 수정 응답 */
export interface CommentRetouchResponse {
  status: "CREATED";
  message: string;
  data: string; // ""
}

const COMMENT_BASE = "/book/comment";

/** 댓글 작성: POST /api/book/comment/write?commentId= */
export const postCommentWrite = async (
  commentId: number | string,
  chat: string
): Promise<CommentWriteResponse> => {
  try {
    const res = await axiosInstance.post<CommentWriteResponse>(
      `${COMMENT_BASE}/write`,
      { chat },
      {
        params: { commentId },
      }
    );

    if (res.status === 201 && res.data.status === "CREATED") {
      return res.data;
    }

    throw new Error(
      res.data?.message ||
        "댓글 작성 중 알 수 없는 오류가 발생했습니다."
    );
  }  catch (error: unknown) { // ✅ any 제거
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 404) throw new Error("댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)");
      if (apiMessage) throw new Error(apiMessage);
    }
    throw new Error("댓글 좋아요 요청 중 오류가 발생했습니다.");
  }
};

/** 댓글 좋아요: POST /api/book/comment/like?commentId= */
export const postCommentLike = async (
  commentId: number | string
): Promise<CommentLikeResponse> => {
  try {
    const res = await axiosInstance.post<CommentLikeResponse>(
      `${COMMENT_BASE}/like`,
      null,
      {
        params: { commentId },
      }
    );

    if (
      res.status === 201 &&
      res.data?.status === "CREATED" &&
      res.data?.data === true
    ) {
      return res.data;
    }

    throw new Error(
      res.data?.message ||
        "댓글 좋아요 처리 중 알 수 없는 오류가 발생했습니다."
    );
  }catch (error: unknown) { // ✅ any 제거
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 400) throw new Error("회원정보가 일치하지 않습니다. (NOT_VALID_MEMBER_INFO)");
      if (status === 404) throw new Error("댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)");
      if (apiMessage) throw new Error(apiMessage);
    }
    throw new Error("댓글 삭제 요청 중 오류가 발생했습니다.");
  }
}

/** 댓글 삭제: PATCH /api/book/comment/delete?commentId= */
export const deleteComment = async (
  commentId: number | string
): Promise<CommentDeleteResponse> => {
  try {
    const res = await axiosInstance.patch<CommentDeleteResponse>(
      `${COMMENT_BASE}/delete`,
      null,
      {
        params: { commentId },
      }
    );

    if (res.status === 204 || res.data?.status === "NO_CONTENT") {
      return (
        res.data || {
          status: "NO_CONTENT",
          message: "successfully comment retouched",
          data: "",
        }
      );
    }

    throw new Error(
      res.data?.message ||
        "댓글 삭제 처리 중 알 수 없는 오류가 발생했습니다."
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 400){ 
        throw new Error("회원정보가 일치하지 않습니다. (NOT_VALID_MEMBER_INFO)");
      }
      if (status === 404){
       throw new Error("댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)");
      } 
      if (apiMessage){
       throw new Error(apiMessage);
      }  
    }
    throw new Error("댓글 삭제 요청 중 오류가 발생했습니다.");
  }
};

/** 댓글 수정: PATCH /api/book/comment/retouch?commentId= */
export const retouchComment = async (
  commentId: number | string,
  chat: string
): Promise<CommentRetouchResponse> => {
  if (!chat || !chat.trim()) {
    throw new Error("수정할 댓글 내용을 입력해주세요.");
  }

  try {
    const res = await axiosInstance.patch<CommentRetouchResponse>(
      `${COMMENT_BASE}/retouch`,
      { chat },
      {
        params: { commentId },
      }
    );

    if (res.status === 201 && res.data?.status === "CREATED") {
      return res.data;
    }

    throw new Error(
      res.data?.message ||
        "댓글 수정 처리 중 알 수 없는 응답이 반환되었습니다."
    );
  } catch (error: unknown) { // ✅ any 제거
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const apiMessage = (error.response?.data as { message?: string } | undefined)?.message;

      if (status === 404){
       throw new Error("댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)");
      }  
      if (apiMessage){
       throw new Error(apiMessage);
      }  
    }
    throw new Error("댓글 수정 요청 중 오류가 발생했습니다.");
  }
};