/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: process.env.NODE_ENV === 'production' ? '/website' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/website/' : '',
}

module.exports = nextConfig;