import type { NextConfig } from "next";

const supabaseImgHost = process.env.SUPABASE_IMG_PATH
    ? new URL(process.env.SUPABASE_IMG_PATH).hostname
    : undefined;

const nextConfig: NextConfig = {
    devIndicators: {
        position: "bottom-right",
    },
    images: {
        remotePatterns: supabaseImgHost
            ? [
                {
                    protocol: "https",
                    hostname: supabaseImgHost,
                    pathname: "/**",
                },
            ]
            : [],
    },
};

export default nextConfig;
