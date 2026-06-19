/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server bundle in .next/standalone for Docker.
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      jspdf: 'jspdf/dist/jspdf.es.min.js',
    }
    return config
  },
}

export default nextConfig
