const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const { NODE_ENV = "production" } = process.env;
module.exports = {
  entry: "./src/app.js",
  mode: NODE_ENV,
  target: "node",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
  // fix issue with dotenv import file on es6 imports
  plugins: [new NodemonPlugin(), new Dotenv()],
};
