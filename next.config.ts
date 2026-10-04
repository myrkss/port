import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 is used for the website screenshots so their ui text stays readable
    qualities: [75, 90],
  },
};

export default nextConfig;
