// 目标1： 体验webpack打包的过程
// 1. 准备项目和源代码
import { checkPhone, checkCode } from "../utils/check.js";
// console.log(checkPhone(1234567), checkCode(1234567));
// 2. 准备webpack 打包环境
// 2.1 安装2个包
// npm i webpack webpack-cli --save-dev
// 2.2 配置文件package.json 中添加自定义的打包命令
// "build":"webpack"
// 3. 运行自定义的打包命令，观察打包的过程
// npm run build

// 目标2： 修改webpack打包的入口和出口
// 1. 项目根目录下，新建webpack.config.js配置文件
// 2. 导出配置对象，配置入口，出口文件路径
// 3. 重新打包观察

// 目标3： 用户登录-长度判断案例
// 1. 准备用户登录页面
// 2. 编写核心JS逻辑代码
// 3. 打包并手动复制网页到dist下，引入打包后的JS，运行

// 2. 编写核心JS逻辑代码
document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;
  console.log(phone, code);
  if (!checkPhone(phone)) {
    console.log("手机号必须是11位");
    return;
  }
  if (!checkCode(code)) {
    console.log("手机号必须是6位");
    return;
  }
  console.log("提交到服务器...");
});

// 目标4： 使用插件 html-webpack-plugin 生成html网页文件，并引入打包后的其他资源
// 1. 下载 html-webpack-plugin 插件本地软件包
// npm i html-webpack-plugin --save-dev
// 2. 配置webpack.config.js, 让webpack拥有插件功能
// 3. 重新打包观察效果

// 目标5： 打包css文件， 将打包后的css文件插入进js文件中
// 1. 准备css文件，并引入到入口js文件中，
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
// 2. 下载 加载器本地软件包 css-loader 和 style-loader
// npm i css-loader style-loader --save-dev
// 3. 配置webpack.config.js, 让webpack拥有加载器功能
// 4. 重新打包观察效果

// 目标6： 打包css文件, 生成单独的css文件
// 1. 准备css文件，并引入到入口js文件中，
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// 2. 下载 插件本地软件包 mini-css-extract-plugin
// npm i --save-dev mini-css-extract-plugin
// 3. 配置webpack.config.js,
// 4. 重新打包观察效果

// 目标7： 优化- 压缩打包后的css文件
// 1. 下载 插件本地软件包 css-minimizer-webpack-plugin
// npm i --save-dev css-minimizer-webpack-plugin
// 2. 配置webpack.config.js,
// 3. 重新打包观察效果

// 目标8： 打包less文件,
// 1. 新建less代码（设置背景图片） 并引入到src/login/index.js中
import "./indexLess.less";
// 2. 下载 本地软件包 less 和 less-loader
// npm i --save-dev less less-loader
// 3. 配置webpack.config.js,
// 4. 重新打包观察效果
