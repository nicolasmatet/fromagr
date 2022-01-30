const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    API_URL: process.env.API_URL || 'http://127.0.0.1:9000/api'
}

module.exports = {
    externals: {
        ConfigData: JSON.stringify(config)
    },
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            title: "Fromagr",
            meta:{
                description:"Un site pour choisir ses association de vins et fromages",
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                charset:'utf-8',
            },
            favicon: "./public/favicon/favicon.ico"

        }),
        new CopyPlugin({
            patterns: [
                { from: "public/manifest.json", to: "" },
            ],
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}