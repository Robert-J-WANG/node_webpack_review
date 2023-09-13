const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
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
    // 打包HTML文件的插件
    new HtmlWebpackPlugin({
      title: "My App",
      template: path.resolve(__dirname, "public/login.html"), // 以这个路径下的login.html文件问模版，输出打包后生成的html文件
      filename: path.resolve(__dirname, "dist/login/index.html"), // 打包后生成的html文件路径
    }),
    // 打包css文件的插件
    new MiniCssExtractPlugin(),
  ],

  // 加载器, 让webpack能打包跟多类型的模块
  module: {
    rules: [
      // css模块的规则列表
      {
        test: /\.css$/i, // 匹配 .css 结尾的文件, i 忽略大小写
        // use: ["style-loader", "css-loader"], // 使用从后到前的加载器来解析 css 代码和插入到 DOM
        use: [MiniCssExtractPlugin.loader, "css-loader"], // 使用插件，打包成单独的css文件
      },

      // less模块的规则列表
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
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
};
