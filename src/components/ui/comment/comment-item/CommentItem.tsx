"use client";
import React from "react";
import styles from "./styles.module.scss";
import { CommentsData } from "@/types/comment";
import { useGlobalStore } from "@/stores/state";
import { Avatar } from "../../avatar";
import { formatTime } from "@/utils/formatTime";
import { InfoIcon } from "lucide-react";
import CommentOptions from "../comment-options";

interface CommentItemProps {
  commentsDataItem: CommentsData;
  activeCommentId: string | null;
  setActiveCommentId: React.Dispatch<React.SetStateAction<string | null>>;
  isEditComment: string | null;
  setIsEditComment: React.Dispatch<React.SetStateAction<string | null>>;
  handleDeleteComment?: (commentId: string) => void;
  handleEditComment?: (commentId: string) => void;
  setEditComment?: React.Dispatch<React.SetStateAction<string>>;
  editComment?: string;
  editCommentLoading?: boolean;
  noOptions?: boolean;
}

const CommentItem = ({
  commentsDataItem,
  activeCommentId,
  setActiveCommentId,
  isEditComment,
  setIsEditComment,
  handleDeleteComment,
  handleEditComment,
  setEditComment,
  editComment,
  editCommentLoading,
  noOptions = false,
}: CommentItemProps) => {
  const { userData } = useGlobalStore();
  const handleActionMessage = (commentId: string) => {
    setActiveCommentId((prev) => (prev === commentId ? null : commentId));
  };

  const handleCancelEdit = () => {
    setIsEditComment(null);
  };

  const editInputRefs = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditComment && editInputRefs.current) {
      editInputRefs.current.focus();
    }
  }, [isEditComment]);

  return (
    <div className={styles.comment_item_container}>
      <div className={styles.comment_item}>
        <Avatar userData={commentsDataItem.user_id} size="lg" />
        {isEditComment === commentsDataItem._id ? (
          <>
            <input
              ref={editInputRefs}
              type="text"
              placeholder="Edit comment"
              value={editComment}
              onChange={(e) => setEditComment?.(e.target.value)}
              className={styles.comment_section_owner_input}
            />
            <button
              className={styles.comment_section_owner_cancel_btn}
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              className={styles.comment_section_owner_btn}
              onClick={() => handleEditComment?.(commentsDataItem._id)}
            >
              {editCommentLoading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <div className={styles.comment_item_infor}>
            <h5 className={styles.comment_item_infor_title}>
              {commentsDataItem?.user_id?.username}
              <span className={styles.comment_item_infor_date}>
                {formatTime(commentsDataItem?.updatedAt)}
              </span>
              <span className={styles.comment_item_infor_date}>
                {commentsDataItem?.chapter_id?.title}
              </span>
            </h5>
            <span className={styles.comment_item_infor_content}>
              {commentsDataItem?.content}
            </span>
          </div>
        )}
      </div>
      {userData?._id === commentsDataItem?.user_id?._id && !noOptions && (
        <div className={styles.comment_item_icon_container}>
          <div
            className={styles.comment_item_icon}
            onClick={() => handleActionMessage(commentsDataItem?._id)}
          >
            <InfoIcon color="#fff" />
          </div>

          {activeCommentId === commentsDataItem._id && (
            <CommentOptions
              handleDeleteComment={handleDeleteComment}
              commentId={commentsDataItem?._id}
              setIsEditComment={setIsEditComment}
              setActiveCommentId={setActiveCommentId}
              activeCommentId={activeCommentId}
              contentEditValue={commentsDataItem?.content}
              setEditComment={setEditComment}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
