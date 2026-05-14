import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Your WordPress media uploads
        protocol: 'https',
        hostname: 'your-wordpress-site.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        // Allow any hostname during development (override in production)
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Strict mode catches React lifecycle issues early
  reactStrictMode: true,
};

export default nextConfig;
