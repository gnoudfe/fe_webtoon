export const APP_API_ENDPOINT = Object.freeze({
  ENDPOINT: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? "localhost:5000",
    NEXT_PUBLIC_PREFIX_URL: process.env.NEXT_PUBLIC_PREFIX_URL ?? "api",
  },
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
});
