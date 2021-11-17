const path = require("path")

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname,'./dist'),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: path.resolve(__dirname,"./loader/index.js"),
          options: {
            name: 'xiaoyu'
          }
        }]
      }
    ]
  }
}