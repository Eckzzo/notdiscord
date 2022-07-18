/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    relay: {
      src: './',
      artifactDirectory: './src/__generated__',
      language: 'typescript',
    },
  },
};

module.exports = nextConfig;
