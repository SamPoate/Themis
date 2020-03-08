const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    entry: './frontend/src/',
    output: {
        path: path.resolve(__dirname, './frontend/dist/'),
        filename: 'main.js'
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
};
