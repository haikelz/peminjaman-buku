import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "hhawjbhfzdhlgorpcwvq.supabase.co",
    ],
  },
};

export default nextConfig;
