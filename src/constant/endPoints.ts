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
    CHANGE_PASSWORD: '/change-password'
  },
});
