const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
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
                test: /\.(s?)css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
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
