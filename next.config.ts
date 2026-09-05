import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Pin the workspace root to this project. A stray package-lock.json in an ancestor directory makes Next.js infer the wrong root, so Turbopack would watch and resolve files from the wrong directory.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      }
    ],
  },
};

export default nextConfig;
