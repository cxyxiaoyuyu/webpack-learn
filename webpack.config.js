// webpack 基于nodeJS
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽离出css文件
const MiniCssWxtractPlugin = require('mini-css-extract-plugin')
// 压缩css体积
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 做缓存 节省第二次构建时间
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const webpack = require('webpack')
const path = require('path');
const { web } = require('webpack');

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
    filename: "[name]-[chunkhash:6].js",
    // 静态资源输出目录 观察生成的html引入js的地址 不过要自己上传到cnd地址
    // publicPath: "https://cdn.xiaoyu.com/"  
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
      include: path.resolve(__dirname, './src'),
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      include: path.resolve(__dirname, './src'),
      // less-loader less语法转为css语法
      // css-loader css字符串放进bundle文件中
      // style-loader  提取css字符串放进style标签中
      use: [
        // "style-loader",
        // 生产环境下使用minicss插件  这个插件对hmr支持不好 在开发时使用style-loader
        MiniCssWxtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: true  // 开启css模块化  
          }
        },
        {
          loader: "postcss-loader"
        },
        "less-loader"
      ]
      // use: ["style-loader","css-loader","less-loader"]
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, './src'),
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true  // 开启css模块化  
          }
        },
        "sass-loader"
      ]
    }, {
      test: /\.(png|jpe?g|gif)$/,
      include: path.resolve(__dirname, './src'),
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
    }, {
      // test: /\.(eot|ttf|woff|woff2|svg)$/,
      // use: {
      //   loader: "url-loader",
      //   options: {
      //     name: "[name]_[hash:6].[ext]",
      //     outputPath: "font"
      //   }
      // }
    }, {
      test: /\.js/,
      include: path.resolve(__dirname, './src'),
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
      }
    }]
  },
  optimization: {
    // 压缩css体积
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    // 代码分割
    splitChunks: {
      chunks: "all"
    },
    // 作用域提升
    concatenateModules: true
  },
  // 作用于webpack 整个打包周期
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssWxtractPlugin({
      // 用contenthash 只修改js 不修改css hash值不变
      filename: "css/[name]-[contenthash:8].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true // 压缩内联css
      }
    }),
    new webpack.HotModuleReplacementPlugin(),

    // new HardSourceWebpackPlugin()
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
  },

  resolve: {
    // 查找第三方依赖
    modules: [
      path.resolve(__dirname, "./node_modules")
    ],
    // 减少查找过程
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react/umd/react.production.min.js"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom/umd/react-dom.production.min.js")
    },
    // 引入的文件不带后缀 自动加上后缀 查找文件是否存在
    // 后缀尝试列表尽量小  导入语句尽量带上后缀
    extensions: [".js", ".json", ".jsx"]
  },

  // 在html中用script通过cdn引入了以后  入口文件也引用了  就不需要打包了
  externals: {
    //jquery通过script引⼊之后，全局中即有了 jQuery 变量
    'jquery': 'jQuery'
  },


}