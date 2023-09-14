const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
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
    }),
    // 3. 打包css文件的插件
    new MiniCssExtractPlugin(
      // 可以设置打包完的scc文件的输出位置，默认的是dist/main.css
      { filename: "./login/index.css" } // 只能使用相对路径
    ),
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
          process.env.MODE_ENV === "development"
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
          process.env.MODE_ENV === "development"
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
};
