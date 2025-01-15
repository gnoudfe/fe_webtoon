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
import { Avatar } from "../../avatar";
import CommentItem from "../comment-item";

interface CommentDataProps {
  commentsData: CommentsData[];
  chapterId?: string;
  storySlug?: string;
  isAddComment: boolean;
}

const CommentSection = ({
  commentsData,
  chapterId,
  storySlug,
  isAddComment,
}: CommentDataProps) => {
  const [comment, setComment] = React.useState<string>("");
  const [editComment, setEditComment] = React.useState<string>("");
  const { isLoggedIn, userData } = useGlobalStore();

  const [activeCommentId, setActiveCommentId] = React.useState<string | null>(
    null
  );
  const [isEditComment, setIsEditComment] = React.useState<string | null>(null);
  const addCommentMutation = useAddCommentMutatation();
  const deleteCommentMutation = useDeleteCommentMutatation();
  const editCommentMutation = useEditCommentMutation();
  const [commentsDataList, setCommentsDataList] =
    React.useState<CommentsData[]>(commentsData);

  const handleAddComment = async () => {
    try {
      const response = await addCommentMutation.mutateAsync({
        slug: storySlug || "",
        body: {
          chapter_id: chapterId || "",
          content: comment.trim(),
        },
      });
      if (response && response.status === "success") {
        setComment("");
        setCommentsDataList([response.data, ...commentsDataList]);
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
        console.log("response", response);
        setCommentsDataList(
          commentsDataList.filter((comment) => comment._id !== commentId)
        );
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
        setCommentsDataList((prev) =>
          prev.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  content: editComment,
                  updatedAt: new Date().toISOString(),
                }
              : comment
          )
        );
        setIsEditComment(null);
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.comment_section}>
      <h4
        className={styles.comment_section_title}
      >{`${commentsDataList?.length} Comments`}</h4>
      {isLoggedIn && isAddComment && (
        <div className={styles.comment_section_owner}>
          <Avatar userData={userData} size="lg" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
            className={styles.comment_section_owner_input}
          />
          <button className={styles.comment_section_owner_cancel_btn}>
            Cancel
          </button>
          <button
            className={styles.comment_section_owner_btn}
            onClick={handleAddComment}
          >
            Comment
          </button>
        </div>
      )}
      {commentsDataList?.map((comment) => (
        <CommentItem
          key={comment._id}
          commentsDataItem={comment}
          activeCommentId={activeCommentId}
          setActiveCommentId={setActiveCommentId}
          isEditComment={isEditComment}
          setIsEditComment={setIsEditComment}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
          setEditComment={setEditComment}
          editComment={editComment}
        />
      ))}
    </div>
  );
};

export default CommentSection;
