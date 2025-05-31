/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
    distDir: 'out',
    // Remove basePath and assetPrefix since we're now using cartgr.github.io directly
}

module.exports = nextConfig;