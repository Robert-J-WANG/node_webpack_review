const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    new HtmlWebpackPlugin({
      title: "My App",
      template: path.resolve(__dirname, "public/login.html"), // 以这个路径下的login.html文件问模版，输出打包后生成的html文件
      filename: path.resolve(__dirname, "dist/login/index.html"), // 打包后生成的html文件路径
    }),
  ],
};
