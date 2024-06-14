/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/profile/:path*',
                destination: process.env.CLERK_IMAGE_URL + '/:path*',
            },
        ];
    },
};

export default nextConfig;
