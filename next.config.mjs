/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // ImageKit CDN — igual que el sitio de referencia.
        // Sustituye <tu_id> por tu endpoint real de ImageKit.
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
