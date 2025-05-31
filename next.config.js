/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    // Remove basePath and assetPrefix since we're now using cartgr.github.io directly
    async redirects() {
        return [
            {
                source: '/website/:path*',
                destination: '/:path*',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig;