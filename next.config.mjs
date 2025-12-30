/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add any necessary Next.js configuration here
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
