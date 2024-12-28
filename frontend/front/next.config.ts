import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "example.com",
      "wallhaven.cc",
      "res.cloudinary.com",
      "example.com",
      "localhost",
      "images.unsplash.com",
    ], // Add the domain here
  },
};

export default nextConfig;
