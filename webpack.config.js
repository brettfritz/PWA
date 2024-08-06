const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: './client/src/js/index.js', // Entry point for your application
  output: {
    path: path.resolve(__dirname, 'client/dist'), // Output directory
    filename: '[name].bundle.js', // Output file name
  },
  mode: 'production', // Use production mode to minify and optimize the build
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel loader to JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/, // Apply CSS loader to CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply file loader for images
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new HtmlWebpackPlugin({
      template: './client/index.html', // HTML template file
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // Extract CSS into separate files
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'client/src/images', // Copy images to the dist folder
          to: 'images',
        },
      ],
    }),
    new InjectManifest({
      swSrc: './client/src-sw.js', // Path to the service worker source file
      swDest: 'service-worker.js', // Output filename for the service worker
    }),
    new WebpackPwaManifest({
      name: 'JATE Text Editor',
      short_name: 'JATE',
      description: 'A text editor application that works offline.',
      background_color: '#ffffff',
      theme_color: '#000000',
      start_url: '.',
      display: 'standalone',
      icons: [
        {
          src: path.resolve('client/src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
};
