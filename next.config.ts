import type { NextConfig } from "next";

/* Article cover images and user avatars are served straight from the publish service's
   S3 bucket, and next/image rejects any host not listed in remotePatterns. Read from env
   instead of hardcoding, since the bucket differs per environment -- this mirrors the
   publish service's own AWS_PUBLIC_URL_PREFIX, so keep the two in sync.

   next.config.ts is evaluated in Node, so a plain server-side variable is enough here -- no
   NEXT_PUBLIC_ prefix needed. It does have to be present at BUILD time though, not only at
   runtime: `next build` persists the resolved image config into
   .next/required-server-files.json, so the Dockerfile passes it as a build arg too. */
const s3PublicUrlPrefix = process.env.AWS_PUBLIC_URL_PREFIX;

if (!s3PublicUrlPrefix) {
  console.warn("[next.config] AWS_PUBLIC_URL_PREFIX is not set -> next/image will reject every S3-hosted cover image and avatar.");
}

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
      },
      ...(s3PublicUrlPrefix
        ? [
            {
              protocol: "https" as const,
              hostname: new URL(s3PublicUrlPrefix).hostname,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
