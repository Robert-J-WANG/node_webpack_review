/**
 * 目标：基于 CommonJS 标准语法，导入工具属性和方法使用
 */
// 导入
const obj = require("./utils.js");
// 使用
console.log(obj);
console.log(obj.url);
console.log(obj.getArraySum([1, 2, 3, 5, 6]));
