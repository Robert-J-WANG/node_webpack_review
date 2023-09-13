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
// document.querySelector(".btn").addEventListener("click", () => {
//   const phone = document.querySelector(".login-form [name=mobile]").value;
//   const code = document.querySelector(".login-form [name=code]").value;
//   console.log(phone, code);
//   if (!checkPhone(phone)) {
//     console.log("手机号必须是11位");
//     return;
//   }
//   if (!checkCode(code)) {
//     console.log("手机号必须是6位");
//     return;
//   }
//   console.log("提交到服务器...");
// });

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

// 目标9： 打包资源模块（图片）,
// 1. 创建img标签，并动态添加到页面，配置webpack.config.js里的资源模块
// 注意： js中引入本地图片资源要用import方式（如果是网络图片http地址，字符串可以直接写）
import imgObj from "./assets/logo.png";
const theImg = document.createElement("img");
theImg.src = imgObj;
document.querySelector(".login-wrap").appendChild(theImg);
// 2. 重新打包观察效果

/**
 * 目标10：完成登录功能
 *  10.1 使用 npm 下载 axios（体验 npm 作用在前端项目中）
 *  10.2 准备并修改 utils 工具包源代码导出实现函数
 *  10.3 导入并编写逻辑代码，打包后运行观察效果
 */

// 导入带有baseUrl的axios， 默认导入，可以自定义命名
import myAxios from "../utils/request.js";
// 导入myAlert模块， 命名导入，必须使用原名
import { myAlert } from "../utils/alert.js";

//  注册事件
document.querySelector(".btn").addEventListener("click", () => {
  const phone = document.querySelector(".login-form [name=mobile]").value;
  const code = document.querySelector(".login-form [name=code]").value;
  console.log(phone, code);
  if (!checkPhone(phone)) {
    myAlert(false, "手机号必须是11位");
    console.log("手机号必须是11位");
    return;
  }
  if (!checkCode(code)) {
    myAlert(false, "验证码必须是6位");
    console.log("验证码必须是6位");
    return;
  }
  myAxios({
    url: "/v1_0/authorizations",
    method: "POST",
    data: {
      mobile: phone,
      code: code,
    },
  })
    .then((res) => {
      myAlert(true, "登录成功");
      // localStorage.setItem("token", res.data.token);
      // location.href = "../content/index.html";
    })
    .catch((error) => {
      myAlert(false, error.response.data.message);
    });
});
