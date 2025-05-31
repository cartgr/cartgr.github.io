/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    // Remove basePath and assetPrefix since we're now using cartgr.github.io directly
}

module.exports = nextConfig;