import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add any necessary Next.js configuration here
};

export default withPWA(nextConfig);
