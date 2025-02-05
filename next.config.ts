import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_DOMAIN,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
