/**
 * 目标：基于 fs 模块读写文件内容
 *  1. 加载 fs 模块对象
 *  2. 写入文件内容
 *  3. 读取文件内容
 */
// 1. 加载 fs 模块对象
const fs = require("fs");
// 2. 写入文件内容
fs.writeFile("./test.txt", "hello world 11", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("写入成功");
});

// 3. 读取文件内容
fs.readFile("./test.txt", (err, data) => {
  if (err) {
    console.log(err);
  }
  // data 是 buffer 16 进制数据流对象
  console.log(data); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64 20 31 31>
  // .toString() 转换成字符串
  console.log(data.toString()); // hello world 11
});
