/** @type {import('next').NextConfig} */
import WP from './config/webpack.js'

const nextConfig = {
    webpack: (config, {webpack}) => WP(config, webpack),
};

export default nextConfig;
