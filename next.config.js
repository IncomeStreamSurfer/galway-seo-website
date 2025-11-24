/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Enable static export for all pages
  // output: 'export', // Uncomment this for fully static export if needed
}

module.exports = nextConfig
