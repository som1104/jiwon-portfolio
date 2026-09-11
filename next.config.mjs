/** @type {import('next').NextConfig} */
const nextConfig = {
  // 서버 기능이 없는 순수 정적 포트폴리오 사이트라, out/ 으로 빌드해서
  // Render Static Site 같은 정적 호스팅에 그대로 올릴 수 있게 한다.
  output: "export",
  images: {
    // 정적 export에서는 next/image의 서버 최적화를 쓸 수 없어서 끈다.
    unoptimized: true,
  },
};

export default nextConfig;
