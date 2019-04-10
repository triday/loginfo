const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const output_dir = "dist";
const output_path = path.resolve(__dirname, output_dir);


module.exports = {
    entry: {
        'index': './src/index.ts'
    },
    externals: [
        "tsharp"
    ],
    target: 'node',
    output: {
        filename: '[name].js',
        path: output_path,
        library: 'log',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]

};