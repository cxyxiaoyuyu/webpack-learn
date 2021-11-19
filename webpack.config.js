const path = require("path")

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: "main.js"
  },
  resolveLoader: {
    modules: ["node_modules","./loader"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          "index2",
          {
            loader: "index",
            options: {
              name: 'xiaoyu'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "less-loader"
        ]
      }
    ]
  }
}