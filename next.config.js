/**
 * @type {import('next').NextConfig}
 */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
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
  pwa: {
    // disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    scope: '/',
    runtimeCaching,
  },
})
