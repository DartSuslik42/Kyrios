const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.join(__dirname, 'src', 'main.js'),
    devServer: {
        static: [
            './dist',
            path.join(__dirname, 'public'),
        ],
        compress: true,
        port: 8000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.s(c|a)ss$/,
            //     use: [
            //         'vue-style-loader',
            //         'css-loader',
            //         {
            //             loader: 'sass-loader',
            //             // Requires sass-loader@^7.0.0
            //             options: {
            //                 implementation: require('sass'),
            //                 indentedSyntax: true // optional
            //             },
            //             // // Requires >= sass-loader@^8.0.0
            //             // options: {
            //             //     implementation: require('sass'),
            //             //     sassOptions: {
            //             //         indentedSyntax: true // optional
            //             //     },
            //             // },
            //         },
            //     ],
            // },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        modules: [
            path.join(__dirname, 'src',),
            path.join(__dirname, 'node_modules'),
        ],
    }
}