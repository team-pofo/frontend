import removeImports from "next-remove-imports";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // 프로토콜 설정 (http 또는 https)
        hostname: "velog.velcdn.com", // 도메인 설정
        pathname: "/**", // 경로 설정, 모든 경로 허용
      },
    ],
  },
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default removeImports()(nextConfig);
