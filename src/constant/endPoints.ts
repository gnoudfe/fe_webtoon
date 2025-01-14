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
  },
});
