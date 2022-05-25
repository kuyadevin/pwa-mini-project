const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwas-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
      cards: "./src/js/cards.js",
    },

    // TODO: Add the correct output
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    // TODO: Add the correct plugins
    plugins: [
      //Generates our HTML files
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "iContact Cards",
      }),
      // Injects service worker
      new InjectManifest({
        swSrc: "/src-sw.js",
        swDest: "service-worker.js",
      }),
      // Creates our manifest.json file
      new WebpackPwaManifest({
        name: "iContact Cards",
        short_name: "Contacts",
        description: "Keep track of contacts and their info!",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    // TODO: Add the correct modules
    module: {
      // Loads in CSS
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/present-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
