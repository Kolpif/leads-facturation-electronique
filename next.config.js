/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // For Docker deployment
  images: {
    domains: [],
  },
}

module.exports = nextConfig
