/**
 * 目标：基于 http 模块创建 Web 服务程序
 *  1.1 加载 http 模块，创建 Web 服务对象
 *  1.2 监听 request 请求事件，设置响应头和响应体
 *  1.3 配置端口号并启动 Web 服务
 *  1.4 浏览器请求（http://localhost:3000）测试
 */

// 1.1 加载 http 模块，创建 Web 服务对象
const fs = require("fs");
const path = require("path");
let html = "";
fs.readFile(path.join(__dirname, "../04/dist/index.html"), (err, data) => {
  if (err) {
    console.log(err);
  }
  html = data.toString();
});
const http = require("http");
// 创建 Web 服务对象
const server = http.createServer();
// 1.2 监听 request 请求事件，设置响应头和响应体
server.on("request", (req, res) => {
  // 设置响应头-内容类型-html文本以及中文编码格式
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // 响应体
  res.end(html);
});

// 1.3 配置端口号并启动 Web 服务
server.listen(3000, () => {
  console.log("web服务器启动成功了");
});
