import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: ( config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    module.exports = {
      plugins: [new MiniCssExtractPlugin()],
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
    };
    return config
  }};

export default nextConfig;