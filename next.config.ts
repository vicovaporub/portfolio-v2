import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    domains: [process.env.SUPABASE_IMG_PATH || ''],
  },
};

export default nextConfig;
