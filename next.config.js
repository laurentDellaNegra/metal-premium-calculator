/**
 * @type {import('next').NextConfig}
 */

const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  swcMinify: true,
  //TODO: might break in the future
  experimental: { images: { allowFutureImage: true }, nextScriptWorkers: true },
  async rewrites() {
    return [
      {
        source: '/market/:path*',
        destination: 'https://www.bloomberg.com/quote/:path*',
      },
    ]
  },
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public',
    scope: '/',
    runtimeCaching,
  },
})
