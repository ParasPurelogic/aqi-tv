import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_DOMAIN,
  poweredByHeader: false,
};

export default nextConfig;
