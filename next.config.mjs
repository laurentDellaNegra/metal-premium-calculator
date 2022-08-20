/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  //TODO: might break in the future
  experimental: { images: { allowFutureImage: true } },
}
export default nextConfig
