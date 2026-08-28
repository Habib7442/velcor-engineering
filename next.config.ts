import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-mode route indicator (bottom-left "N" badge) keeps getting
  // mistaken for a stray UI element in screenshots/reviews. It never ships
  // to production anyway, but disabling it locally avoids the confusion.
  devIndicators: false,
  images: {
    // Next 16 defaults to quality 75 only, and requires an explicit allowlist.
    // 100 is needed for the logo (text-heavy PNG — 75 introduces visible
    // softness/ringing around the wordmark); 75 stays the default for photos.
    qualities: [75, 100],
  },
  async redirects() {
    // /our-expertise and /what-we-do were retired in favor of /expertise's
    // 3-category structure — redirect rather than 404 in case either URL
    // was ever shared or indexed.
    return [
      { source: "/our-expertise", destination: "/expertise", permanent: true },
      { source: "/what-we-do", destination: "/expertise", permanent: true },
    ];
  },
};

export default nextConfig;
