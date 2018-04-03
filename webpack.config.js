const webpack = require("webpack");

module.exports = {
  mode: 'production',
  entry: {
    "coveo-xrm": "./src/Index.ts",
  },
  output: {
    path: require("path").resolve("./bin/js"),
    filename: `[name].min.js`,
    chunkFilename: `[name].min.js`,
    libraryTarget: "umd",
    library: "CoveoXrm",
    publicPath: "js/",
    devtoolModuleFilenameTemplate: "[resource-path]"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: 'tsconfig.json',
        }
      },
    ]
  },
  plugins: [],
  bail: true
}