import React from "react";
import CommentSection from "./comment-section";
import { CommentResponse } from "@/types/comment";
import { StoryWebtoonApi } from "@/services/apiRequest";
async function getCommentsStory(slug: string) {
  const response: CommentResponse = await StoryWebtoonApi.GetCommentsStory({
    slug,
  });
  return response;
}

const Comment = async ({ slug }: { slug: string }) => {
  const commentStory = await getCommentsStory(slug);
  return (
    <CommentSection commentsData={commentStory?.data} isAddComment={false} />
  );
};

export default Comment;
