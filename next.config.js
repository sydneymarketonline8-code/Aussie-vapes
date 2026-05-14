/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Top-level brand shortcuts (SEO + bookmark friendliness)
      { source: '/iget', destination: '/brand/iget', permanent: true },
      { source: '/alfakher', destination: '/brand/alfakher', permanent: true },
      { source: '/hqd', destination: '/brand/hqd', permanent: true },
      { source: '/gunnpod', destination: '/brand/gunnpod', permanent: true },
      { source: '/lost-mary', destination: '/brand/lost-mary', permanent: true },
      { source: '/lostmary', destination: '/brand/lost-mary', permanent: true },
      { source: '/vozol', destination: '/brand/vozol', permanent: true },
      { source: '/relx', destination: '/brand/relx', permanent: true },
      { source: '/elux', destination: '/brand/elux', permanent: true },
      { source: '/mr-fog', destination: '/brand/mr-fog', permanent: true },
      { source: '/mrfog', destination: '/brand/mr-fog', permanent: true },
      { source: '/serein', destination: '/brand/serein', permanent: true },
      { source: '/fisco', destination: '/brand/fisco', permanent: true },
      { source: '/alibarbar', destination: '/brand/alibarbar', permanent: true },
      { source: '/jnr', destination: '/brand/jnr', permanent: true },
      { source: '/kuz', destination: '/brand/kuz', permanent: true },
      { source: '/x-qlusive', destination: '/brand/x-qlusive', permanent: true },
      { source: '/xqlusive', destination: '/brand/x-qlusive', permanent: true },
      { source: '/groo', destination: '/brand/groo', permanent: true },
      { source: '/vapehub', destination: '/brand/vapehub', permanent: true },

      // Category shortcuts
      { source: '/disposable-vapes', destination: '/category/disposable-vapes', permanent: true },
      { source: '/disposables', destination: '/category/disposable-vapes', permanent: true },
      { source: '/disposable', destination: '/category/disposable-vapes', permanent: true },
      { source: '/pod-systems', destination: '/category/pod-systems', permanent: true },
      { source: '/pods', destination: '/category/pod-systems', permanent: true },
      { source: '/vape-kits', destination: '/category/pod-systems', permanent: true },
      { source: '/nicotine-salts', destination: '/category/nicotine-salts', permanent: true },
      { source: '/nic-salts', destination: '/category/nicotine-salts', permanent: true },
      { source: '/e-liquids', destination: '/category/e-liquids', permanent: true },
      { source: '/eliquid', destination: '/category/e-liquids', permanent: true },
      { source: '/vape-juice', destination: '/category/e-liquids', permanent: true },
      { source: '/accessories-cat', destination: '/category/accessories', permanent: true },
      { source: '/coils', destination: '/category/accessories', permanent: true },
      { source: '/pouches', destination: '/category/accessories', permanent: true },

      // City shortcuts (SEO: "vapes Sydney", "aussie vapes melbourne" etc.)
      { source: '/sydney', destination: '/aussie-vapes/sydney', permanent: true },
      { source: '/melbourne', destination: '/aussie-vapes/melbourne', permanent: true },
      { source: '/brisbane', destination: '/aussie-vapes/brisbane', permanent: true },
      { source: '/perth', destination: '/aussie-vapes/perth', permanent: true },
      { source: '/adelaide', destination: '/aussie-vapes/adelaide', permanent: true },
      { source: '/aussie-vapes-sydney', destination: '/aussie-vapes/sydney', permanent: true },
      { source: '/aussie-vapes-melbourne', destination: '/aussie-vapes/melbourne', permanent: true },
      { source: '/aussie-vapes-brisbane', destination: '/aussie-vapes/brisbane', permanent: true },
      { source: '/aussie-vapes-perth', destination: '/aussie-vapes/perth', permanent: true },
      { source: '/aussie-vapes-adelaide', destination: '/aussie-vapes/adelaide', permanent: true },
      { source: '/locations', destination: '/aussie-vapes', permanent: true },
      { source: '/locations/:city', destination: '/aussie-vapes/:city', permanent: true },

      // SEO / legacy short-paths
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/shop', destination: '/category/disposable-vapes', permanent: true },
      { source: '/store-locator', destination: '/store', permanent: true },
      { source: '/sitemap', destination: '/sitemap-html', permanent: false },
      { source: '/site-map', destination: '/sitemap-html', permanent: true },
      { source: '/faqs', destination: '/faq', permanent: true },
      { source: '/help-center', destination: '/help', permanent: true },
      { source: '/help-centre', destination: '/help', permanent: true },
      { source: '/return-policy', destination: '/returns', permanent: true },
      { source: '/refund-policy', destination: '/returns', permanent: true },
      { source: '/shipping-policy', destination: '/shipping', permanent: true },
      { source: '/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/terms', permanent: true },
      { source: '/tos', destination: '/terms', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/wholesale', destination: '/bulk', permanent: true },
      { source: '/b2b', destination: '/bulk', permanent: true },
      { source: '/news', destination: '/blog', permanent: true },
      { source: '/articles', destination: '/blog', permanent: true },
      { source: '/guides', destination: '/blog', permanent: true },
      { source: '/order-tracking', destination: '/track', permanent: true },
      { source: '/track-order', destination: '/track', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/get-in-touch', destination: '/contact', permanent: true },
      { source: '/specials', destination: '/sale', permanent: true },
      { source: '/clearance', destination: '/sale', permanent: true },
      { source: '/deals', destination: '/sale', permanent: true },
      { source: '/new', destination: '/new-arrivals', permanent: true },
      { source: '/latest', destination: '/new-arrivals', permanent: true },

      // Common WooCommerce / WordPress legacy patterns
      { source: '/product-category/:slug', destination: '/category/:slug', permanent: true },
      { source: '/shop/:slug', destination: '/product/:slug', permanent: true },
    ]
  },
}

module.exports = nextConfig
