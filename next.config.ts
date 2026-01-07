import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},

  // 配置图片域名
  images: {
    domains: ['rf-research.com', 'github.com'],
  },

  // ISR 默认设置（可根据需要调整）
  experimental: {
    // 启用服务器端操作
    serverActions: {
      allowedOrigins: ['localhost:5000'],
    },
  },
};

export default nextConfig;
