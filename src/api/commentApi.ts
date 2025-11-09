import axiosInstance from './apiClient';

export interface CommentWriteResponse {
  status: string; // "CREATED"
  message: string; // "successfully successfully comment written"
  data: string;    // "" (현재 스펙상)
}

/**
 * 댓글 작성 API
 * POST /api/book/comment/write
 * Query Param: commentId (Long)
 * Body: { "chat": "내용" }
 * Header: Authorization: Bearer {access_token} (axiosInstance 인터셉터에서 자동 설정)
 */
export const postCommentWrite = async (
  commentId: number | string,
  chat: string,
): Promise<CommentWriteResponse> => {
  try {
    const res = await axiosInstance.post<CommentWriteResponse>(
      '/api/book/comment/write',
      { chat },
      {
        params: { commentId }, // 스펙: commentId는 Request Param
      },
    );

    // 스펙 기준 성공: 201 + status: "CREATED"
    if (res.status === 201 && res.data.status === 'CREATED') {
      return res.data;
    }

    throw new Error(
      res.data?.message ||
        '댓글 작성 중 알 수 없는 오류가 발생했습니다.',
    );
  } catch (error: any) {
    // 대상 리소스 없음
    if (error.response?.status === 404) {
      throw new Error('대상 리소스를 찾을 수 없습니다. (404)');
    }

    // 그 외 에러는 그대로 메시지 전달
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('댓글 작성 요청 중 오류가 발생했습니다.');
  }
};

export interface CommentWriteResponse {
  status: string; // "CREATED"
  message: string;
  data: string;
}

/** ✅ 댓글 좋아요 API 응답 타입 */
export interface CommentLikeResponse {
  status: 'CREATED';
  message: string;      // "successfully comment liked"
  data: boolean;        // true = 좋아요 처리 성공
}

/**
 * ✅ 댓글 좋아요 API
 * METHOD: POST /api/book/comment/like
 * Request Param: commentId (Long)
 * Body: 없음
 * Header: Authorization: Bearer {access_token}  (axiosInstance 인터셉터에서 자동 설정)
 */
export const postCommentLike = async (
  commentId: number | string,
): Promise<CommentLikeResponse> => {
  try {
    const res = await axiosInstance.post<CommentLikeResponse>(
      '/api/book/comment/like',
      null,                 // Body 없음
      {
        params: { commentId }, // 스펙: Request Param 사용
      },
    );

    // ✅ 정상 성공 케이스
    if (
      res.status === 201 &&
      res.data?.status === 'CREATED' &&
      res.data?.data === true
    ) {
      return res.data;
    }

    // 혹시 모를 이상 응답 처리
    throw new Error(
      res.data?.message || '댓글 좋아요 처리 중 알 수 없는 오류가 발생했습니다.',
    );
  } catch (error: any) {
    // 🔴 대상 댓글 없음
    if (error.response?.status === 404) {
      // BOOK_COMMENT_NOT_FOUND
      throw new Error('댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)');
    }

    // 🔴 서버에서 메시지 내려준 경우 그대로 전달
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('댓글 좋아요 요청 중 오류가 발생했습니다.');
  }
};

export interface CommentWriteResponse {
  status: string; // "CREATED"
  message: string; // "successfully successfully comment written"
  data: string;    // ""
}

/** ✅ 댓글 삭제 API 응답 타입 */
export interface CommentDeleteResponse {
  status: 'NO_CONTENT';
  message: string;   // "successfully comment retouched"
  data: string;      // "" (스펙 기준)
}


 // 댓글 삭제 API
export const deleteComment = async (
  commentId: number | string,
): Promise<CommentDeleteResponse> => {
  try {
    const res = await axiosInstance.patch<CommentDeleteResponse>(
      '/api/book/comment/delete',
      null, // Body 없음
      {
        params: { commentId }, // 스펙: Request Param 사용
      },
    );

    // 서버 스펙은 204 NO_CONTENT + JSON 명시 → 둘 다 커버
    if (res.status === 204 || res.data?.status === 'NO_CONTENT') {
      return (
        res.data || {
          status: 'NO_CONTENT',
          message: 'successfully comment retouched',
          data: '',
        }
      );
    }

    throw new Error(
      res.data?.message ||
        '댓글 삭제 처리 중 알 수 없는 오류가 발생했습니다.',
    );
  } catch (error: any) {
    const status = error.response?.status;

    // 🔴 400: NOT_VALID_MEMBER_INFO
    if (status === 400) {
      throw new Error(
        '회원정보가 일치하지 않습니다. (NOT_VALID_MEMBER_INFO)',
      );
    }

    // 🔴 404: BOOK_COMMENT_NOT_FOUND
    if (status === 404) {
      throw new Error('댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)');
    }

    // 서버에서 message 내려준 경우 우선 사용
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('댓글 삭제 요청 중 오류가 발생했습니다.');
  }
};

/** ✅ 댓글 수정 API 응답 타입 */
export interface CommentRetouchResponse {
  status: 'CREATED'; // 성공 시 고정
  message: string;   // "successfully comment retouched"
  data: string;      // 스펙 기준: ""
}

/**
 *  댓글 수정 API
 */
export const retouchComment = async (
  commentId: number | string,
  chat: string,
): Promise<CommentRetouchResponse> => {
  if (!chat || !chat.trim()) {
    throw new Error('수정할 댓글 내용을 입력해주세요.');
  }

  try {
    const res = await axiosInstance.patch<CommentRetouchResponse>(
      '/api/book/comment/retouch',
      { chat },
      {
        params: { commentId },
      },
    );

    // 명세: 201 CREATED + status: "CREATED"
    if (res.status === 201 && res.data?.status === 'CREATED') {
      return res.data;
    }

    throw new Error(
      res.data?.message ||
        '댓글 수정 처리 중 알 수 없는 응답이 반환되었습니다.',
    );
  } catch (error: any) {
    const status = error.response?.status;

    // 🔴 404: BOOK_COMMENT_NOT_FOUND
    if (status === 404) {
      throw new Error('댓글이 존재하지 않습니다. (BOOK_COMMENT_NOT_FOUND)');
    }

    // 서버에서 message 내려준 경우 우선 사용
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    throw new Error('댓글 수정 요청 중 오류가 발생했습니다.');
  }
};