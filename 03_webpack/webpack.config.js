const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

const config = {
  // Webpack 打包模式
  // mode: "development", // 推荐在package.json 中的命令行中设置, 如下所示：
  // "scripts": {
  //   "build": "webpack --mode=production",
  //   "dev": "webpack serve --open --mode=development"
  // },

  // 1. 打包JS功能
  // 入口
  entry: path.resolve(__dirname, "src/login/index.js"),
  // 出口
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./login/index.js",
    clean: true, // 生产打包文件之前，清空之前的打包路劲
  },

  // 插件：给webpack提供更多功能
  plugins: [
    // 2. 打包HTML文件的插件
    new HtmlWebpackPlugin({
      title: "My App",
      template: path.resolve(__dirname, "public/login.html"), // 以这个路径下的login.html文件问模版，输出打包后生成的html文件
      filename: path.resolve(__dirname, "dist/login/index.html"), // 打包后生成的html文件路径

      // 自定义属性，在 html 模板中 <%=htmlWebpackPlugin.options.useCdn%> 访问使用
      useCdn: process.env.NODE_ENV === "production",
    }),
    // 3. 打包css文件的插件
    new MiniCssExtractPlugin(
      // 可以设置打包完的scc文件的输出位置，默认的是dist/main.css
      { filename: "./login/index.css" } // 只能使用相对路径
    ),
    // webpack内置的插件，给前端注入node.js中的环境变量
    new webpack.DefinePlugin({
      // key 是注入到打包后的前端 JS 代码中作为全局变量
      // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  // 加载器, 让webpack能打包跟多类型的模块
  module: {
    rules: [
      // css模块的规则列表
      {
        // 匹配规则
        test: /\.css$/i, // 匹配 .css 结尾的文件, i 忽略大小写

        // 方式 1： css打包进JS文件中
        // use: ["style-loader", "css-loader"], // 使用从后到前的加载器来解析 css 代码和插入到 DOM

        // 方式 2： css打包成独立的css文件
        // use: [MiniCssExtractPlugin.loader, "css-loader"], // 使用插件，打包成单独的css文件

        // 优化版：根据打包模式的不同，设置不同的打包方式
        // 成产模式：使用 style-loader方式；
        // 开发模式：使用 MiniCssExtractPlugin.loader方式；
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },

      // less模块的规则列表
      {
        // 匹配规则
        test: /\.less$/i,

        // 使用加载器的方式
        // use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],

        // 优化版：根据打包模式的不同，设置不同的打包方式
        // 成产模式：使用 style-loader方式；
        // 开发模式：使用 MiniCssExtractPlugin.loader方式；
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
      },

      // 资源模块（图片）的规则列表
      {
        // 匹配规则
        test: /\.(png|jpg|jpeg|gif)$/i,
        // 生成模式
        type: "asset", //  在导出一个 data URI 和发送一个单独的文件之间自动选择(8kb为界)
        // 打包输出命名
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },

  // 优化打包
  optimization: {
    // 最小化，压缩打包后的文件
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即
      // `terser-webpack-plugin`），将下一行取消注释（保证 JS 代码还能被压缩处理）
      `...`,
      new CssMinimizerPlugin(), // 压缩打包后的css代码
    ],
  },

  // 调试错误
  // devtool: "inline-source-map",  // 根据开发模式动态添加，在外面设置
  // inline-source-map 选项：把源码的位置信息一起打包在 JS 文件内

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};

// 调试错误
if (process.env.NODE_ENV === "development") {
  config.devtool = "inline-source-map";
}

// 生产环境下使用相关配置
if (process.env.NODE_ENV === "production") {
  // 外部扩展（让 webpack 防止 import 的包被打包进来）
  config.externals = {
    // key：import from 语句后面的字符串
    // value：留在原地的全局变量（最好和 cdn 在全局暴露的变量一致）
    "bootstrap/dist/css/bootstrap.min.css": "bootstrap",
    axios: "axios",
  };
}
module.exports = config;
