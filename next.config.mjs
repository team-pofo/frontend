/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", // 프로토콜 설정 (http 또는 https)
        hostname: "media.4-paws.org", // 도메인 설정
        pathname: "/**", // 경로 설정, 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
