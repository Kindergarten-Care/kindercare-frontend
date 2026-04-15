import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactCompiler: true,
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
