import { useMutation } from "@tanstack/react-query";
import { StoryWebtoonApi } from "../apiRequest";

export const useAddCommentMutatation = () => {
  return useMutation({
    mutationFn: async ({
      slug,
      body,
    }: {
      slug: string;
      body: { chapter_id: string; content: string };
    }) => {
      const response = await StoryWebtoonApi.AddComment({ slug, body });
      if (response) {
        return response;
      }
    },
    mutationKey: ["addComment"],
  });
};

export const useDeleteCommentMutatation = () => {
  return useMutation({
    mutationFn: async ({ commentId }: { commentId: string }) => {
      const response = await StoryWebtoonApi.DeleteComment({ commentId });
      if (response) {
        return response;
      }
    },
    mutationKey: ["deleteComment"],
  });
};

export const useEditCommentMutation = () => {
  return useMutation({
    mutationFn: async ({
      commentId,
      body,
    }: {
      commentId: string;
      body: { content: string };
    }) => {
      const response = await StoryWebtoonApi.EditComment({ commentId, body });
      if (response) {
        return response;
      }
    },
    mutationKey: ["editComment"],
  });
};
