/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // 90 : photo détourée du hero ; à 75 la compression WebP fait des escaliers
  // sur la veste sombre et le détourage, visibles avec le fondu du bas.
  images: {
    qualities: [75, 90],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection",         value: "1; mode=block" },
        ],
      },
    ];
  },
};

export default nextConfig;
