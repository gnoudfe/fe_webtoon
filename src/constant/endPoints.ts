export const APP_API_ENDPOINT = Object.freeze({
  ENDPOINT: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL ?? ("http://localhost:5000" as string),
    NEXT_PUBLIC_PREFIX_URL: process.env.NEXT_PUBLIC_PREFIX_URL ?? "api",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    VERITY: "/getUser",
    LOGOUT: "/logout",
    CHANGE_PASSWORD: "/change-password",
    CHANGE_AVATAR: "/updateAvatar",
  },
  STORY: {
    GET_ALL_STORIES: (limit?: number | null, page?: number | null) =>
      `/stories/all?limit=${limit}&page=${page}`,
    GET_TOP_STORIES: (limit?: number | null, page?: number | null) =>
      `/stories/top?limit=${limit}&page=${page}`,
    GET_HIGHLIGHT_STORIES: (limit?: number | null, page?: number | null) =>
      `/stories/highlight?limit=${limit}&page=${page}`,
    GET_LATEST_STORIES: (limit?: number | null, page?: number | null) =>
      `/stories/latest?limit=${limit}&page=${page}`,
    GET_STORY_DETAIL: (slug: string) => `/stories/${slug}`,
    GET_STORY_COMMENTS: (slug: string, page?: number, limit?: number) =>
      `/stories/${slug}/comments?page=${page}&limit=${limit}`,
    GET_CHAPTER_DETAIL: (slug: string, slugChapter: string) =>
      `/stories/${slug}/chapter/${slugChapter}`,
    GET_CHAPTER_COMMENTS: (
      slug: string,
      slugChapter: string,
      page?: number,
      limit?: number
    ) => `/stories/${slug}/comments/${slugChapter}?page=${page}&limit=${limit}`,
    ADD_COMMENT: (slug: string) => `/stories/${slug}/comments`,
    DELETE_COMMENT: (commentId: string) => `/comments/delete/${commentId}`,
    EDIT_COMMENT: (commentId: string) => `/comments/update/${commentId}`,
    GET_STORY_BY_TAG: (
      slug: string,
      page?: number | null,
      limit?: number | null
    ) => `/stories/tag/${slug}?page=${page}&limit=${limit}`,
    GET_STORY_BY_CATEGORY: (
      slug: string,
      page?: number | null,
      limit?: number | null
    ) => `/stories/category/${slug}?page=${page}&limit=${limit}`,
    FOLLOW_STORY: (slug: string) => `/stories/${slug}/follow`,
    UNFOLLOW_STORY: (slug: string) => `/stories/${slug}/unfollow`,
    GET_FOLLOWING_STORIES: (page: number | null, limit: number | null) =>
      `/followed?page=${page}&limit=${limit}`,
    ADD_STORY_HISTORY: (slug: string) => `/stories/${slug}/history`,
    GET_STORY_HISTORY: (page: number | null, limit: number | null) =>
      `/reading-history?page=${page}&limit=${limit}`,
    SEARCH_STORY: (query: string | null) => `/search?query=${query}`,
  },
});
