const path = require('path')
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const webpack = require('webpack');


module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    devtool: 'inline-source-map',
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
            use: [
              {
                loader: 'svg-url-loader',
                options: {
                  limit: 10000,
                },
              },
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ['file-loader?name=[name].[ext]']
          }
        ],
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
            // Enables Hot Modules Replacement
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
           template: path.resolve( __dirname, 'public/index.html' ),
           filename: 'index.html'
        })
     ],
     devServer: {
        historyApiFallback: true
     },
  }