/** @type {import('next').NextConfig} */
import WP from './config/webpack.js'

const nextConfig = {
    webpack: (config, {webpack}) => WP(config, webpack),
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sphereapp.ru',
                port: '',
                pathname: '/api/account/s3/**',
            },
        ],
    },
};

export default nextConfig;
