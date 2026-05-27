import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"]
  },
  turbopack: {
    root: projectRoot
  }
};

export default nextConfig;
