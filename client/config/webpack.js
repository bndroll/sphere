/** @param config {import('webpack').Configuration} */
const patchWebpackConfig = (config, webpack) => {
    config.resolve.alias = {
        ...config.resolve.alias,
    };
    // Grab the existing rule that handles SVG imports
    const svgRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
            ...svgRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
            test: /\.svg$/i,
            // issuer: /\.[jt]sx?$/,
            resourceQuery: { not: /url/ }, // exclude if *.svg?url
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                    },
                },
            ],
        },
    );
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    svgRule.exclude = /\.svg$/i;

    config.plugins.push(
        new webpack.ProvidePlugin({
            cn: 'classnames',
        }),
    );

    return config;
};

module.exports = patchWebpackConfig;
