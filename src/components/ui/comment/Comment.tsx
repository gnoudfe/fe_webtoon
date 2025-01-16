import React from "react";
import CommentSection from "./comment-section";

const Comment = async ({ slug }: { slug: string }) => {
  return <CommentSection storySlug={slug} isAddComment={false} />;
};

export default Comment;
