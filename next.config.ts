import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nunjucks-playground",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
