"use client";
import React from "react";
import styles from "./styles.module.scss";
import { CommentsData } from "@/types/comment";
import CommentItem from "../comment-item";
import Pagination from "../../pagination";
import { StoryWebtoonApi } from "@/services/apiRequest";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import CommentSkeleton from "../comment-skeleton";

interface CommentDataProps {
  storySlug?: string;
}

const CommentSection = ({ storySlug }: CommentDataProps) => {
  const queryClient = useQueryClient();
  const [editComment, setEditComment] = React.useState<string>("");
  // Lấy lại pagination từ cache hoặc thiết lập giá trị mặc định
  const cachedPagination = queryClient.getQueryData<{
    currentPage: number;
    totalPages: number;
    totalComments: number;
  }>(["pagination", storySlug]);
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
  const fetchComments = async (page: number) => {
    try {
      const response = await StoryWebtoonApi.GetCommentsStory({
        slug: storySlug || "",
        page: page,
      });

      if (response && response.status === "success") {
        setPagination({
          currentPage: page,
          totalPages: response?.pagination?.totalPages || 1,
          totalComments: response?.pagination?.totalComments || 0,
        });
        // Lưu pagination vào cache React Query
        queryClient.setQueryData(["pagination", storySlug], {
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
    queryKey: ["comments", pagination.currentPage, storySlug],
    queryFn: () => fetchComments(pagination.currentPage),
    placeholderData: keepPreviousData,
  });

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

          {commentsDataList?.data?.length === 0 && (
            <p className={styles.comment_section_no_comment}>
              This story has no comments yet.
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
              setEditComment={setEditComment}
              editComment={editComment}
              noOptions={true}
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

export default CommentSection;
