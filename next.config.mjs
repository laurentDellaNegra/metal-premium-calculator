/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
  //TODO: might break in the future
  experimental: { images: { allowFutureImage: true } },
  async rewrites() {
    return [
      {
        source: '/market',
        destination: 'https://www.prokerala.com/finance/gold-price.php',
      },
    ]
  },
}
export default nextConfig
