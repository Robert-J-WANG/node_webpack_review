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

/**
 * 目标11：配置开发服务器环境 webpack-dev-server
 *  11.1 使用 npm 下载 webpack-dev-server
 *  11.2 webpack.config中设置打包模式为开发模式， package.json中配置自定义命令
 *  11.3 使用npm run dev 来启动开发服务器，试试热更新的效果
 *
 *  11.4 注意事项：
 *      注意 1：webpack-dev-server借助 node.js 的 http 模块创建了默认为8080的web服务端口；
 *      注意 2：默认以public文件夹作为服务器根目录；
 *      注意 3：webpack-dev-server根据配置，打包了相关代码到内存当中，并且以 webpack.config中设置
 *            的出口路径output.path的值作为服务器根目录（所以可以直接自己拼接访问dist目录下的内容）；
 *      注意 4：优化方案： 直接自动跳转到打包文件，无需自己拼接
 *            在public文件夹下创建index.html, 并在此文件中使用location.href跳转到指定文件连接
 * 
 * <script>
    location.href = './login/index.html';
  </script>
 */

/**
 * 目标 12：打包模式设置
 *  12.1 development 模式： 用于调试代码，实时加载，模块热替换（快）
 *  12.2 production 模式： 用于发布上线，极致压缩代码，优化资源，更轻量（小）
 *  12.3 设置方式：
 *      方式 1：webpack.config中设置 mode:development/production；
 *      方式 2：package.json 中设置 自定义命令行
 *      
 *      "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack --mode=production", 
            "dev": "webpack serve --open --mode=development"，
          }
 *
 */

/**
 * 目标 13：打包模式的应用： 变量区分两种模式
 * 需求： 
 *    开发模式： 使用style-loader加载器，内嵌css代码在js中，让热替换更快
 *    生成模式： 使用smini-css-extract-plugin，提取css代码，让浏览器缓存和并行下载js和文件
 * 步骤：
 *  13.1 下载软件包 cross-env到本地
 *  13.2 配置文件package.json的自定义命令，
 *       传入参数名和值到process.env对象上（它是node.js的环境变量）
 * 
  *        "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1",
              "build": "cross-env MODE_ENV=production webpack --mode=production",
              "dev": "cross-env MODE_ENV=development webpack serve --open --mode=development"
            },

 *  13.3 在webpack.config中 调用做判断区分：

    module: {
      rules: [
        // css模块的规则列表
        {
          // 成产模式：使用 style-loader方式； 
          // 开发模式：使用 MiniCssExtractPlugin.loader方式； 
          use: [
            process.env.MODE_ENV === "production"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader",
          ],
        },

        // less模块的规则列表
        {
          // 成产模式：使用 style-loader方式；
          // 开发模式：使用 MiniCssExtractPlugin.loader方式；
          use: [
            process.env.MODE_ENV === "production"
              ? "style-loader"
              : MiniCssExtractPlugin.loader,
            "css-loader",
            "less-loader",
          ],
        },
      ]
    }
 */

/**
 * 目标 14： 应用- 向前端注入环境变量
 *  14.1 需求： 前端项目中， 开发模式下打印语句生效，生成模式下打印语句失效
 *  14.2 使用 webpack内置的DefinePlugin 插件：
 * 
 *   plugins: [
 * 
      // webpack内置的插件，给前端注入node.js中的环境变量

      new webpack.DefinePlugin({
        // key 是注入到打包后的前端 JS 代码中作为全局变量
        // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
 * 
 *  14.3 代码逻辑：
 */
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
}
console.log("开发模式下打印语句生效，生成模式下打印语句失效");

/**
 * 目标 15：webpack中调试代码错误
 *  15.1 问题：打包后的 error和warning 代码的位置和源代码的位置对不上，不方便我们调试
 *  15.2 解决： 启用webpack的source-map 资源地图功能
 *  15.3 步骤：
 *      1：webpack.config中设置 devtool 选项和值， 开启功能（注意：只在开发环境中使用）

            module.exports = {
              // ...
              devtool: 'inline-source-map'
            }
 *      2：在代码中创造一个错误，并在开发环境中查看效果
 */

// consolee.warn("1111");

/**
 * 目标16：路径解析别名设置
 *  作用：让我们前端代码引入路径更简单（而且使用绝度路径）
 *  16.1 在 webpack.config.js 中配置 resolve.alias 选项
 *
    const config = {
      // ...
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      }
    }
 *  16.2 在代码中尝试并在开发环境和生产环境测试效果
 */
import yourAxios from "@/utils/request.js";
// 对比之前的引入方式：
// import yourAxios from "../utils/request.js";
console.log(yourAxios);

/**
 * 目标17：第三方库使用 CDN 加载引入
 *  17.1 在 html 中引入第三方库的 CDN 地址并用模板语法判断
 * 
 *   <% if(htmlWebpackPlugin.options.useCdn){ %>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css" rel="stylesheet">
  <% } %>

    <% if(htmlWebpackPlugin.options.useCdn){ %>
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.min.js"></script>
  <% } %> 

 *  17.2 配置 webpack.config.js 中 externals 外部扩展选项（防止某些 import 的包被打包）
  
 *  17.3 两种模式下打包观察效果
 */

/**
 * 目标18：多页面打包
 *  18.1 准备源码（html，css，js）放入相应位置，并改用模块化语法导出
 *  18.2 下载 form-serialize 包并导入到核心代码中使用（略过）
 *  18.3 配置 webpack.config.js 多入口和多页面的设置
 *  18.4 重新打包观察效果
 */
