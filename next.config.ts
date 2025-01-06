import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.hentai18.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
