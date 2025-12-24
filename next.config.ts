import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // eslint config moved to eslint.config.mjs in Next.js 16
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blob.v0.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Next.js 16: Turbopack is now the default bundler
  // The React Compiler is stable and enabled by default in Next.js 16
  // No experimental flags needed for React Compiler in Next.js 16
}

export default nextConfig
