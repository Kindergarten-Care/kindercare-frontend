import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@kindercare/ui'],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
