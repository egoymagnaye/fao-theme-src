const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    ["em-globals"]: ["./src/js/globals.js", "./src/sass/style.scss"],
  },
  output: {
    path: path.resolve(
      "../fao-local-2/wp-content/themes/fao-theme-hello/assets/",
      "js"
    ), //__dirname
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/styles.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader?url=false",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                sourceMap: true,
                outputStyle: "expanded",
              },
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
};
