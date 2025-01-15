export const APP_API_ENDPOINT = Object.freeze({
  ENDPOINT: {
    NEXT_PUBLIC_BASE_URL:
      process.env.NEXT_PUBLIC_BASE_URL ?? "https://be-crawl-webtoon.vercel.app",
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
    GET_STORY_COMMENTS: (slug: string) => `/stories/${slug}/comments`,
    GET_CHAPTER_DETAIL: (slug: string, slugChapter: string) =>
      `/stories/${slug}/chapter/${slugChapter}`,
    GET_CHAPTER_COMMENTS: (slug: string, slugChapter: string) =>
      `/stories/${slug}/comments/${slugChapter}`,
    ADD_COMMENT: (slug: string) => `/stories/${slug}/comments`,
    DELETE_COMMENT: (commentId: string) => `/comments/delete/${commentId}`,
    EDIT_COMMENT: (commentId: string) => `/comments/update/${commentId}`,
  },
});
