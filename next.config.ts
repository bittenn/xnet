import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // {
      //   protocol: "https",
      //   hostname: "images.unsplash.com", // 필요시 추가
      // },
    ],
  },
};

export default nextConfig;
