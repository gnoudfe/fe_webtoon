import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
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

export const useGetStoriesByType = ({
  slug,
  type,
}: {
  slug: string;
  type: "tag" | "category";
}) => {
  return useInfiniteQuery({
    queryKey: ["getStoriesByType", slug, type],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await StoryWebtoonApi.GetStoriesByType({
          slug,
          type,
          page: pageParam,
        });
        if (response.status === "error") {
          throw new Error(response.message);
        }
        if (response) {
          console.log("response", response);
          return response;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : null;
    },
  });
};

export const useGetStories = ({
  type,
}: {
  type: "latest" | "top" | "highlight" | "all";
}) => {
  return useInfiniteQuery({
    queryKey: ["getStories", type],
    queryFn: async ({ pageParam }) => {
      const response = await StoryWebtoonApi.GetListStories({
        type,
        page: pageParam,
      });
      if (response && response.status === "success") {
        return response;
      } else {
        throw new Error(response.message);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : null;
    },
  });
};

export const useGetFollowingStories = () => {
  return useInfiniteQuery({
    queryKey: ["getFollowingStories"],
    queryFn: async ({ pageParam }) => {
      const response = await StoryWebtoonApi.GetFollowingStories({
        page: pageParam,
      });
      if (response && response.status === "success") {
        return response;
      } else {
        throw new Error(response.message);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : null;
    },
  });
};

export const UseFollowStoryMutation = () => {
  return useMutation({
    mutationFn: async ({ slug }: { slug: string }) => {
      const response = await StoryWebtoonApi.FollowStory({ slug });
      if (response && response.status === "success") {
        return response;
      } else {
        throw new Error(response.message);
      }
    },
  });
};

export const UseUnFollowStoryMutation = () => {
  return useMutation({
    mutationFn: async ({ slug }: { slug: string }) => {
      const response = await StoryWebtoonApi.UnFollowStory({ slug });
      if (response && response.status === "success") {
        return response;
      } else {
        throw new Error(response.message);
      }
    },
  });
};
