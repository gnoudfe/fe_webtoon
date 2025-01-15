"use client";
import React from "react";
import styles from "./styles.module.scss";
import { Edit, Trash } from "lucide-react";
import useDetectClickOutside from "@/hooks/useDetectClickOutside";
interface CommentSectionOptionsProps {
  activeCommentId: string;
  handleDeleteComment?: (commentId: string) => void;
  setIsEditComment: React.Dispatch<React.SetStateAction<string | null>>;
  commentId: string;
  setActiveCommentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CommentOptions = ({
  handleDeleteComment,
  setIsEditComment,
  setActiveCommentId,
  activeCommentId,
  commentId,
}: CommentSectionOptionsProps) => {
  const handleEditComment = () => {
    setIsEditComment(commentId);
    setActiveCommentId(null);
  };
  const optionRefs = React.useRef<HTMLUListElement>(null);

  useDetectClickOutside(optionRefs, () => {
    if (activeCommentId) {
      setActiveCommentId(null)
    }
  });
  return (
    <ul ref={optionRefs} className={styles.comment_section_options}>
      <li
        className={styles.comment_section_options_item}
        onClick={handleEditComment}
      >
        <Edit width={20} height={20} />
        Edit
      </li>
      <li
        className={styles.comment_section_options_item}
        onClick={() => handleDeleteComment?.(commentId)}
      >
        <Trash width={20} height={20} />
        Delete
      </li>
    </ul>
  );
};

export default CommentOptions;
