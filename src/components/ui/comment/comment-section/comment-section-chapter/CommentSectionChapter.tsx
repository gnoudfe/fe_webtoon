"use client";
import React from "react";
import styles from "./styles.module.scss";
import { CommentsData } from "@/types/comment";
import { useGlobalStore } from "@/stores/state";
import {
  useAddCommentMutatation,
  useDeleteCommentMutatation,
  useEditCommentMutation,
} from "@/services/queries/useStory";
import { StoryWebtoonApi } from "@/services/apiRequest";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import CommentSkeleton from "../../comment-skeleton";
import { Avatar } from "@/components/ui/avatar";
import CommentItem from "../../comment-item";
import Pagination from "@/components/ui/pagination";

interface CommentDataProps {
  chapterId?: string;
  storySlug?: string;
  slugChapter?: string;
}

const CommentSectionChapter = ({
  chapterId,
  storySlug,
  slugChapter,
}: CommentDataProps) => {
  const queryClient = useQueryClient();
  const [comment, setComment] = React.useState<string>("");
  const [editComment, setEditComment] = React.useState<string>("");
  const { isLoggedIn, userData } = useGlobalStore();
  // Lấy lại pagination từ cache hoặc thiết lập giá trị mặc định
  const cachedPagination = queryClient.getQueryData<{
    currentPage: number;
    totalPages: number;
    totalComments: number;
  }>(["pagination", storySlug, slugChapter]);
  const [pagination, setPagination] = React.useState(
    cachedPagination || {
      currentPage: 1,
      totalPages: 1,
      totalComments: 0,
    }
  );
  const [activeCommentId, setActiveCommentId] = React.useState<string | null>(
    null
  );
  const [isEditComment, setIsEditComment] = React.useState<string | null>(null);
  const addCommentMutation = useAddCommentMutatation();
  const deleteCommentMutation = useDeleteCommentMutatation();
  const editCommentMutation = useEditCommentMutation();

  const fetchComments = async (page: number) => {
    try {
      const response = await StoryWebtoonApi.GetChapterComments({
        slug: storySlug || "",
        slugChapter: slugChapter || "",
        page: page,
      });

      if (response && response.status === "success") {
        setPagination({
          currentPage: page,
          totalPages: response?.pagination?.totalPages || 1,
          totalComments: response?.pagination?.totalComments || 0,
        });
        // Lưu pagination vào cache React Query
        queryClient.setQueryData(["pagination", storySlug, slugChapter], {
          currentPage: page,
          totalPages: response?.pagination?.totalPages || 1,
          totalComments: response?.pagination?.totalComments || 0,
        });
      }

      return response;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const { data: commentsDataList, isPending } = useQuery({
    queryKey: [
      "comments-chapter",
      pagination.currentPage,
      storySlug,
      slugChapter,
    ],
    queryFn: () => fetchComments(pagination.currentPage),
    placeholderData: keepPreviousData,
  });

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    try {
      const response = await addCommentMutation.mutateAsync({
        slug: storySlug || "",
        body: {
          chapter_id: chapterId || "",
          content: comment.trim(),
        },
      });
      if (response && response.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [
            "comments-chapter",
            pagination.currentPage,
            storySlug,
            slugChapter,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["comments", pagination.currentPage, storySlug],
          refetchType: "all",
        });
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await deleteCommentMutation.mutateAsync({
        commentId,
      });
      if (response && response.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [
            "comments-chapter",
            pagination.currentPage,
            storySlug,
            slugChapter,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["comments", pagination.currentPage, storySlug],
          refetchType: "all",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = async (commentId: string) => {
    try {
      const response = await editCommentMutation.mutateAsync({
        commentId,
        body: {
          content: editComment,
        },
      });
      if (response && response.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [
            "comments-chapter",
            pagination.currentPage,
            storySlug,
            slugChapter,
          ],
        });
        queryClient.invalidateQueries({
          queryKey: ["comments", pagination.currentPage, storySlug],
          refetchType: "all",
        });
        setIsEditComment(null);
        setEditComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className={styles.comment_section}>
      {isPending ? (
        <CommentSkeleton />
      ) : (
        <>
          <h4
            className={styles.comment_section_title}
          >{`${pagination?.totalComments} Comments`}</h4>
          {isLoggedIn && pagination.currentPage === 1 && (
            <div className={styles.comment_section_owner}>
              <Avatar userData={userData} size="lg" />
              <form
                className={styles.comment_section_owner}
                onSubmit={(e) => handleAddComment(e)}
              >
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment"
                  className={styles.comment_section_owner_input}
                />
                <button
                  type="button"
                  className={styles.comment_section_owner_cancel_btn}
                  onClick={() => setComment("")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.comment_section_owner_btn}
                >
                  {addCommentMutation.isPending ? "Loading..." : "Comment"}
                </button>
              </form>
            </div>
          )}
          {commentsDataList?.data?.length === 0 && (
            <p className={styles.comment_section_no_comment}>
              No comments yet. Be the first to comment
            </p>
          )}
          {commentsDataList?.data?.map((commentItem: CommentsData) => (
            <CommentItem
              key={commentItem._id}
              commentsDataItem={commentItem}
              activeCommentId={activeCommentId}
              setActiveCommentId={setActiveCommentId}
              isEditComment={isEditComment}
              setIsEditComment={setIsEditComment}
              handleDeleteComment={handleDeleteComment}
              handleEditComment={handleEditComment}
              setEditComment={setEditComment}
              editComment={editComment}
              editCommentLoading={editCommentMutation?.isPending}
            />
          ))}
          {pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CommentSectionChapter;
