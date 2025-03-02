require("./_logger.js");
/** @type {import('next').NextConfig} */

const nextConfig = {
  logger: {
    log: (message) => console.log(`[${new Date().toISOString()}] ${message}`),
    error: (message) => console.error(`[${new Date().toISOString()}] ERROR: ${message}`),
    warn: (message) => console.warn(`[${new Date().toISOString()}] WARNING: ${message}`),
  },
  webpack: (config, { isServer }) => {
    // Configura Webpack para manejar archivos .mjs
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
}

module.exports = nextConfig
