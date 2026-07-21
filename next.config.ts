import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // If static HTML export is desired, uncomment the line below:
  // output: 'export',
  // Disable server-side react errors in console for production
  reactStrictMode: true,
};

export default nextConfig;
