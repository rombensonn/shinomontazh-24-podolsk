import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const githubRepositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubPages && githubRepositoryName ? `/${githubRepositoryName}` : "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
        env: {
          NEXT_PUBLIC_BASE_PATH: basePath,
        },
      }
    : {
        serverExternalPackages: ["better-sqlite3"],
      }),
};

export default nextConfig;
