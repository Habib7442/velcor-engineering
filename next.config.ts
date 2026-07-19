import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev-mode route indicator (bottom-left "N" badge) keeps getting
  // mistaken for a stray UI element in screenshots/reviews. It never ships
  // to production anyway, but disabling it locally avoids the confusion.
  devIndicators: false,
};

export default nextConfig;
