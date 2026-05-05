import { useEffect, useRef, useState } from "react";
import userProfile from "../../assets/user.svg";
import { deleteComment, postCommentLike, postCommentWrite } from "../../api/commentApi";
import { getMyInfo } from "../../api/my";
import type { Comment } from "../../types/bookTypes";
import * as S from "../bookDetail/style";
import { useUser } from "../contexts/UserContext";
import CommentForm from "./commentForm";
import CommentList from "./commentList";

interface ReviewSectionProps {
  bookId: number | string;
}

type LooseResponse = {
  data?: unknown;
  status?: string;
  message?: string;
  result?: { commentId?: string | number; id?: string | number };
  commentId?: string | number;
  id?: string | number;
  reviewId?: string | number;
  review_id?: string | number;
};

const makeTempId = () => `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const isTempId = (id: string | number) => typeof id === "string" && id.startsWith("temp-");

const extractCommentId = (response: unknown): string | number | undefined => {
  const value = (response ?? {}) as LooseResponse;
  const nestedData = typeof value.data === "object" && value.data !== null ? (value.data as LooseResponse) : undefined;

  const candidates = [
    value.data,
    nestedData?.data,
    value.commentId,
    nestedData?.commentId,
    value.id,
    nestedData?.id,
    value.reviewId,
    nestedData?.reviewId,
    value.review_id,
    nestedData?.review_id,
    value.result?.commentId,
    value.result?.id,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "number" || typeof candidate === "string") {
      return candidate;
    }
  }

  return undefined;
};

const isOkResponse = (response: unknown): boolean => {
  if (response === false || response == null) return false;
  if (typeof response === "boolean") return response;

  if (typeof response === "object") {
    const value = response as LooseResponse;
    if (value.data === true) return true;

    if (typeof value.data === "object" && value.data !== null) {
      const nested = value.data as LooseResponse;
      return nested.data === true || nested.status === "OK";
    }
  }

  return false;
};

const getMyInfoPayload = (response: unknown) => {
  if (typeof response === "object" && response !== null && "data" in response) {
    const outer = response as { data?: { data?: Record<string, unknown> } | Record<string, unknown> };
    if (outer.data && typeof outer.data === "object" && "data" in outer.data) {
      return ((outer.data as { data?: Record<string, unknown> }).data ?? {}) as Record<string, unknown>;
    }
    return (outer.data ?? {}) as Record<string, unknown>;
  }

  return {};
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return fallback;
};

export default function ReviewSection({ bookId }: ReviewSectionProps) {
  const { user, setUser } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([]);
  const didSyncRef = useRef(false);

  useEffect(() => {
    const syncMyInfo = async () => {
      if (!user?.id || didSyncRef.current || (user.nickName && user.img)) {
        return;
      }

      didSyncRef.current = true;

      try {
        const response = await getMyInfo(user.id);
        const payload = getMyInfoPayload(response);

        setUser({
          id: user.id,
          name: String(payload.name ?? user.name ?? ""),
          nickName: String(payload.nick_name ?? user.nickName ?? ""),
          img: String(payload.member_profile ?? user.img ?? ""),
          email: String(payload.email ?? user.email ?? ""),
        });
      } catch (error) {
        console.warn("getMyInfo failed:", error);
      }
    };

    syncMyInfo();
  }, [setUser, user.email, user.id, user.img, user.name, user.nickName]);

  const handleAddComment = async (newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    if (!user?.id) {
      alert("로그인 후에 댓글을 작성할 수 있습니다.");
      return;
    }

    try {
      const response = await postCommentWrite(bookId, trimmed);
      const serverId = extractCommentId(response);

      const newComment: Comment = {
        id: serverId ?? makeTempId(),
        userId: String(user.id),
        user: user.nickName || user.name || "사용자",
        text: trimmed,
        date: new Date().toISOString(),
        likes: 0,
        profileImg: user.img || userProfile,
      };

      setComments((prev) => [newComment, ...prev]);
    } catch (error: unknown) {
      console.error("comment create failed:", error);
      alert(getErrorMessage(error, "댓글 작성 중 오류가 발생했습니다."));
    }
  };

  const handleToggleLike = async (commentId: string | number) => {
    if (commentId === undefined || commentId === null || commentId === "") {
      alert("댓글 ID가 없어 좋아요를 처리할 수 없습니다.");
      return;
    }

    if (!user?.id) {
      alert("로그인 후에 좋아요를 누를 수 있습니다.");
      return;
    }

    const id = String(commentId);
    const isCurrentlyLiked = likedCommentIds.includes(id);

    try {
      const response = await postCommentLike(commentId);
      if (!isOkResponse(response)) {
        throw new Error("좋아요 처리 결과를 확인할 수 없습니다.");
      }

      setLikedCommentIds((prev) =>
        isCurrentlyLiked ? prev.filter((value) => value !== id) : [...prev, id],
      );

      setComments((prev) =>
        prev.map((comment) =>
          String(comment.id) === id
            ? {
                ...comment,
                likes: isCurrentlyLiked ? Math.max(0, comment.likes - 1) : comment.likes + 1,
              }
            : comment,
        ),
      );
    } catch (error: unknown) {
      console.error("comment like failed:", error);
      alert(getErrorMessage(error, "좋아요 처리 중 오류가 발생했습니다."));
    }
  };

  const onDeleteComment = async (commentId: string | number) => {
    if (!user?.id) {
      alert("로그인 후에 댓글을 삭제할 수 있습니다.");
      return;
    }

    if (isTempId(commentId)) {
      alert("방금 작성한 댓글은 서버 동기화 이후에 삭제할 수 있습니다.");
      return;
    }

    if (!window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    const id = String(commentId);

    try {
      const response = await deleteComment(commentId);
      if (response !== undefined && !isOkResponse(response)) {
        throw new Error("삭제 처리 결과를 확인할 수 없습니다.");
      }

      setComments((prev) => prev.filter((comment) => String(comment.id) !== id));
      setLikedCommentIds((prev) => prev.filter((value) => value !== id));
      alert("댓글이 성공적으로 삭제되었습니다.");
    } catch (error: unknown) {
      console.error("comment delete failed:", error);
      alert(getErrorMessage(error, "댓글 삭제 중 오류가 발생했습니다."));
    }
  };

  return (
    <S.CollectionContainer>
      <div style={{ width: "1440px", padding: "20px 0" }}>
        <CommentForm onAddComment={handleAddComment} disabled={!user?.id} />
        <S.Divider />
        <CommentList
          comments={comments}
          onToggleLike={handleToggleLike}
          likedCommentIds={likedCommentIds}
          onDeleteComment={onDeleteComment}
          currentUserId={user?.id ? String(user.id) : ""}
        />
      </div>
    </S.CollectionContainer>
  );
}


