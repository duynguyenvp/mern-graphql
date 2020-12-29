const path = require("path");

module.exports = () => {

  return {
    name: "Server",
    mode: "development",
    devtool: "source-map",
    context: path.join(__dirname, "./dist/"),
    entry: {
      main: path.join(__dirname, "../server.js")
    },
    output: {
      path: path.join(__dirname, "../build"),
      filename: "server.js",
      publicPath: "/dist/"
    },
    target: "node",

    node: {
      global: false,
      __filename: false,
      __dirname: false
    },
    resolve: {
      extensions: [".js"]
    },
    plugins: [],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };
};
