import removeImports from "next-remove-imports";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: "default",
    domains: [], // 특정 도메인을 지정하지 않음
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 호스트를 허용
      },
    ],
  },
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 리프레시 토큰을 요청에 실어서 보내기 위함. 도메인이 달라서 안 실어짐
  rewrites() {
    return process.env.NODE_ENV === "production"
      ? []
      : [
          {
            source: "/api/:path*",
            destination: `${BASE_URL}/api/:path*`,
          },
        ];
  },
};

export default removeImports()(nextConfig);
