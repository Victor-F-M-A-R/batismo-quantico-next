import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'batismo-quantico-next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubActions
    ? {
        output: 'export',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : undefined,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
