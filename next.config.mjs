import removeImports from "next-remove-imports";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  // 리프레시 토큰을 요청에 실어서 보내기 위함. 도메인이 달라서 안 실어짐
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BASE_URL}/:path*`,
      },
    ];
  },
};

export default removeImports()(nextConfig);
