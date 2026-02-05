/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com', // সব unsplash subdomain
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google images
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatars
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary (যদি use করেন)
      },
    ],
  }
};

export default nextConfig;



