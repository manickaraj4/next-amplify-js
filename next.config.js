/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AMPLIFY_NEXTJS_EXPERIMENTAL_TRACE:true
  }
}

module.exports = nextConfig
