// webpack 基于nodeJS
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssWxtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  // 上下文 项目打包的相对路径 必须是绝对路径
  // context: process.cwd(),
  // 入口 执行构建的入口
  // 字符串 数组 对象
  // entry: "./src/index.js",  // 默认打包入口就是 ./src/index.js
  // entry: ["./src/index.js",'./src/other.js'],
  // 多入口 对应多出口 出口那里需要占位符 [name]
  entry: {
    main: './src/index.js',
    // other: './src/other.js'
  },
  // 出口
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name]-[chunkhash:6].js"

    // 占位符
    // hash 整个项目的hash值 生成文件的hash值是一致 无论修改哪个文件重新构建就都会修改
    // chunkhash  只会修改 修改的入口文件对应的 出口文件的hash值 
    // name
    // id
  },

  mode: "production",
  // loader 
  // 处理不认识的模快
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader','css-loader']
    },{
      test: /\.less$/,
      // less-loader less语法转为css语法
      // css-loader css字符串放进bundle文件中
      // style-loader  提取css字符串放进style标签中
      use: [
        "style-loader",
        // 生产环境下使用minicss插件  这个插件对hmr支持不好 在开发时使用style-loader
        // MiniCssWxtractPlugin.loader,
        {
          loader:  "css-loader",
          options:{
            modules: true  // 开启css模块化  
          } 
        },
        {
          loader: "postcss-loader"
        },
        "less-loader"
      ]
      // use: ["style-loader","css-loader","less-loader"]
    },{
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader:  "css-loader",
          options:{
            modules: true  // 开启css模块化  
          }
        },
        "sass-loader"
      ]
    },{
      test: /\.(png|jpe?g|gif)$/,
      use: {
        // loader: "file-loader",
        loader: "url-loader",  // 推荐使用url-loader 支持limit
        options: {
          name: "[name]_[hash:6].[ext]",
          outputPath: "images",
          // 小于11kb 就转为base64格式
          limit: 9 * 1024,   // 单位是字节byte 1024 = 1kb
        }
      }
    },{
      // test: /\.(eot|ttf|woff|woff2|svg)$/,
      // use: {
      //   loader: "url-loader",
      //   options: {
      //     name: "[name]_[hash:6].[ext]",
      //     outputPath: "font"
      //   }
      // }
    }]
  },
  // 作用于webpack 整个打包周期
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssWxtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      template:"./src/index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 开启source-map  会多出一个map文件
  devtool: "source-map",
  
  devServer: {
    // 静态资源目录
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    hot: true,   // 开启hmO
    open: true,  // 自动打开浏览器窗口
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:9090"
      }
    },
    onBeforeSetupMiddleware: function (devServer) {
      devServer.app.get('/api/info', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
  }
}