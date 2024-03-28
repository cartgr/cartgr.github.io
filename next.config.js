/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: { unoptimized: true },
}

module.exports = nextConfig

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    basePath: isProd ? '/website2.0' : '',
};