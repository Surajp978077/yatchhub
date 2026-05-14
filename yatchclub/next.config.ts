import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // WordPress hosted images — update hostname to your WP domain
        protocol: 'https',
        hostname: 'your-wordpress-site.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        // YouTube thumbnails
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        // If using a CDN like Cloudflare / BunnyCDN
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
    ],
  },

  // Optional: enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
