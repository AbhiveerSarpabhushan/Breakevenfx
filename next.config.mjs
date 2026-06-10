/**
 * Next.js configuration.
 *
 * NOTE: This project targets Next.js 14, which does not support a TypeScript
 * config file (`next.config.ts` is only supported from Next.js 15+). We use
 * `next.config.mjs` so the config loads cleanly. Everything else in the project
 * (tailwind.config.ts, all components, posts) is TypeScript.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
