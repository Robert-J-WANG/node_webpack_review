

## Webpack打包静态模块全过程：

### 0. 打包前准备工作：

1. #### 项目文件夹中初始化包环境，生成 package.json 文件：

    ```bash
    npm init -y
    ```

2. #### 下载 webpack 和 webpack-cli 到项目（版本独立）

    ```bash
    npm i webpack webpack-cli --save-dev
    ```

3. #### 设置包配置文件package.json

    ```json
    {
      	...
      "scripts": {
         ...
        "build": "webpack"
      },
     	...
    }
    ```

    

### 1. 打包js模块：Webpack 修改入口和出口

1. #### 项目根目录，新建 Webpack.config.js 配置文件

2. #### 导出配置对象，修改入口，出口文件路径（别忘了修改磁盘文件夹和文件的名字）

    ```js
    const path = require("path");
    module.exports = {
      // 入口 (需要打包的js文件)
      entry: path.resolve(__dirname, "src/login/index.js"),
      // 出口（打包完成后生成的对应的js文件）
      output: {
        path: path.resolve(__dirname, "dist"),  //文件件
        filename: "./login/index.js",  //文件名
        clean: true, // 生产打包文件之前，清空之前的打包记录
      },
    };
    ```


3. ####  运行打包命令，查看打包结果

    ```bash
    npm run build
    ```

    

### 2. 打包html模块：使用插件 html-webpack-plugin

1. #### 下载 html-webpack-plugin 本地软件包到项目中

    ```bash
    npm i html-webpack-plugin --save-dev
    ```

2. #### 配置 webpack.config.js 让 Webpack 拥有插件功能

    ```js
    // ...
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    
    module.exports = {
      // ...
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/login.html', // 模板文件 ( 需要打包的html文件)
          filename: './login/index.html' // 输出文件 ( 打包后生成的html文件)
        })
      ]
    }
    ```

    ##### 指定以 public/login.html 为模板复制到 dist/login/index.html，并自动引入其他打包后资源

3. ####  运行打包命令，查看打包结果

    ```bash
    npm run build
    ```

    

### 3. 打包css模块：

#### 方法1：使用加载器，将css 代码直接打包进js文件中

- ##### [加载器 css-loader](https://webpack.docschina.org/loaders/css-loader/)：解析 css 代码

- ##### [加载器 style-loader](https://webpack.docschina.org/loaders/style-loader/)：把解析后的 css 代码插入到 DOM（style 标签之间）

1. #### 准备 css 文件引入到 src/login/index.js 中（压缩转译处理等）

    ```js
    /**
     * 目标5：打包 css 代码
     *  5.1 准备 css 代码，并引入到 js 中
     *  5.2 下载 css-loader 和 style-loader 本地软件包
     *  5.3 配置 webpack.config.js 让 Webpack 拥有该加载器功能
     *  5.4 打包后观察效果
     */
    // 5.1 准备 css 代码，并引入到 js 中
    import 'bootstrap/dist/css/bootstrap.min.css'  //下载bootstrap包到本地（可选），如果代码在中使用了bootstrap库,不再需要使用link的方式在线引入
    import './index.css'
    ```

2. #### 下载 css-loader 和 style-loader 本地软件包

    ```bash
    npm i css-loader style-loader --save-dev
    ```

3. #### 配置 webpack.config.js 让 Webpack 拥有该加载器功能

    ```js
    // ...
    
    module.exports = {
      // ...
      module: { // 加载器
        rules: [ // 规则列表
          {
            test: / \.css$/i, // 匹配 .css 结尾的文件, i 忽略大小写
            use: ['style-loader', 'css-loader'], // 使用从后到前的加载器来解析 css 代码和插入到 DOM
          }
        ]
      }
    };
    ```

4. #### 下载bootstrap包到本地（可选），如果代码在中使用了bootstrap库

    ```bash
    npm i bootstrap -d
    ```

5. ####  运行打包命令，查看打包结果,  打包后运行 dist/login/index.html 观察效果，看看准备好的样式是否作用在网页上

    ```bash
    npm run build
    ```

    

#### 方法2：使用mini-css-extract-plugin 插件，将css 代码打包成独立的css文件 (打包后的css文件并未压缩)

1. #### 下载 mini-css-extract-plugin 插件软件包到本地项目中

    ```bash
    npm i --save-dev mini-css-extract-plugin
    ```

    

2. #### 配置 webpack.config.js 让 Webpack 拥有该插件功能

    ```js
    // ...
    const MiniCssExtractPlugin = require("mini-css-extract-plugin")
    
    module.exports = {
      // ...
      module: {
        rules: [
          {
            test: /\.css$/i,
            // use: ['style-loader', 'css-loader']  //  注意：不能和 style-loader 一起使用
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
        ],
      },
      plugins: [
        // ...
       // 打包css文件的插件
        new MiniCssExtractPlugin(
          // 可以设置打包完的scc文件的输出位置，默认的是dist/main.css
          { filename: "./login/index.css" } // 只能使用相对路径
        ),
      ]
    };
    ```

    ##### 注意：不能和 style-loader 一起使用

3. #### 打包后观察效果

    ```bash
    npm run build
    ```

    ##### 好处：css 文件可以被浏览器缓存，减少 JS 文件体积，让浏览器并行下载 css 和 js 文件

    

#### 终极优化： 使用插件css-minimizer-webpack-plugin，将打包后的css文件内的代码压缩

1. ####  下载 mini-css-extract-plugin 插件软件包到本地项目中

    ```bash
    npm i css-minimizer-webpack-plugin --save-dev 
    ```

2. #### 配置 webpack.config.js 让 Webpack 拥有该插件功能

    ```js
    // ...
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    
    module.exports = {
      // ...
      // 优化
      optimization: {
        // 最小化
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 
          // `terser-webpack-plugin`），将下一行取消注释（保证 JS 代码还能被压缩处理）
          `...`,
          new CssMinimizerPlugin(),
        ],
      }
    }
    ```

3. #### 打包后观察 css 文件内自己代码是否被压缩了

    ```bash
    npm run build
    ```

    

### 4. 打包less模块：

#### 使用加载器 less-loader ，打包less模块

1. #### 下载 less 包 和 less-loader 插件软件包到本地项目中

    ```bash
    npm i less less-loader --save-dev
    ```

2. #### 配置webpack.config.js 让 Webpack 拥有该加载器功能

    ```js
    // ...
    
    module.exports = {
      // ...
      module: {
        rules: [
          // ...
          {
            test: /\.less$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"] // 继续打包独立css文件的插件
          }
        ]
      }
    }
    ```

    

3. #### 准备less文件，less 样式引入到 src/login/index.js 中

    ```js
    // 8.1 新建 less 代码（设置背景图）并引入到 src/login/index.js 中
    import './indexLess.less'
    ```

##### 	注意： less文件保存时会自动生成同名的css文件，防止之前的index.css文件被替换，less文件使用其他名字（indexLess.less）

4. #### 打包后观察 

    ```bash
    npm run build
    ```

    

### 5. 打包图片，字体，文档，音频，视频等资源模块：

#### 使用内置的资源模块，不需要下载额外的加载器或插件

1. #### 准备图片资源: 在 src/login/index.js 中给 img 标签添加 logo 图片

    ```js
    /**
     * 目标9：打包资源模块（图片处理）
     *  9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
     *  9.2 打包后观察效果和区别
     */
    // 9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
    // 注意：js 中引入本地图片资源要用 import 方式（如果是网络图片http地址，字符串可以直接写）
    import imgObj from './assets/logo.png'
    const theImg = document.createElement('img')
    theImg.src = imgObj
    document.querySelector('.login-wrap').appendChild(theImg)
    ```

    

2. #### 配置 webpack.config.js 让 Webpack 拥有打包图片功能

    ```js
    // ...
    
    module.exports = {
      // ...
      module: {
        rules: [
          // ...
          {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset',    // 在导出一个 data URI 和发送一个单独的文件之间自动选择(8kb为界)
            generator: {
              filename: 'assets/[hash][ext][query]'
            }
          }
        ]
      }
    }
    ```

3. #### 配置项的解释

    ```java
    配置 webpack.config.js 让 Webpack 拥有打包图片功能
    
    占位符 【hash】对模块内容做算法计算，得到映射的数字字母组合的字符串
    
    占位符 【ext】使用当前模块原本的占位符，例如：.png / .jpg 等字符串
    
    占位符 【query】保留引入文件时代码中查询参数（只有 URL 下生效）
    
    注意：判断临界值默认为 8KB
    
    大于 8KB 文件：发送一个单独的文件并导出 URL 地址
    
    小于 8KB 文件：导出一个 data URI（base64字符串）
    ```

4. #### 打包后观察 

    ```bash
    npm run build
    ```





## webpack打包的应用：



### 将node环境下运行的第三方库，打包处理，生成静态页面，最终在浏览器中渲染

#### 需求：点击登录按钮，基于 npm 下载 axios 包，完成验证码登录功能

1. #### 使用 npm 下载 axios

    ```bash
    npm i axios
    ```

    

2. #### 引入到 src/login/index.js 中,  并编写业务实现

    ```js
    /**
     * 目标10：完成登录功能
     *  10.1 使用 npm 下载 axios（体验 npm 作用在前端项目中）
     *  10.2 准备并修改 utils 工具包源代码导出实现函数
     *  10.3 导入并编写逻辑代码，打包后运行观察效果
     */
    // 10.3 导入并编写逻辑代码，打包后运行观察效果
    import myAxios from '../utils/request.js'
    import { myAlert } from '../utils/alert.js'
    document.querySelector('.btn').addEventListener('click', () => {
      const phone = document.querySelector('.login-form [name=mobile]').value
      const code = document.querySelector('.login-form [name=code]').value
    
      if (!checkPhone(phone)) {
        myAlert(false, '手机号长度必须是11位')
        console.log('手机号长度必须是11位')
        return
      }
    
      if (!checkCode(code)) {
        myAlert(false, '验证码长度必须是6位')
        console.log('验证码长度必须是6位')
        return
      }
    
      myAxios({
        url: '/v1_0/authorizations',
        method: 'POST',
        data: {
          mobile: phone,
          code: code
        }
      }).then(res => {
        myAlert(true, '登录成功')
        localStorage.setItem('token', res.data.token)
        location.href = '../content/index.html'
      }).catch(error => {
        myAlert(false, error.response.data.message)
      })
    })
    ```

    

3. #### 打包后观察 

    ```bash
    npm run build
    ```

    

## Webpack 搭建开发环境

### 目标：

#### 体验 webpack-dev-server 开发服务器，快速开发应用程序

### 讲解：

1. #### 每次改动代码，都要重新打包，很麻烦，所以这里给项目集成 webpack-dev-server 开发服务器

2. #### 作用：启动 Web 服务，打包输出源码在内存，并会自动检测代码变化热更新到网页；

### 步骤：

1. #### 下载 webpack-dev-server 软件包到当前项目

    ```bash
    npm i webpack-dev-server --save-dev
    ```

2. #### 配置自定义命令，并设置打包的模式为开发模式

    ```js
    //  webpack.config中设置打包模式为开发模式
    
    // ...
    module.exports = {
      // ...
      mode: 'development'
    }
    ```

    ```js
    //  package.json中配置自定义命令
    "scripts": {
      // ...
      "dev": "webpack serve --open"
    },
    ```

3. #### 使用 npm run dev 来启动开发服务器，访问提示的域名+端口号，在浏览器访问打包后的项目网页，修改代码后试试热更新效果

    ```js
    热更新: 在 js / css 文件中修改代码保存后，会实时反馈到浏览器
    ```

4. #### 注意事项

    ```js
    /**
     *      注意 1：webpack-dev-server借助 node.js 的 http 模块创建了默认为8080的web服务端口；
     *      注意 2：默认以public文件夹作为服务器根目录；
     *      注意 3：webpack-dev-server根据配置，打包了相关代码到内存当中，并且以 webpack.config中设置
     *                     的出口路径output.path的值作为服务器根目录（所以可以直接自己拼接访问dist目录下的内容）；
     *      注意 4：优化方案： 直接自动跳转到打包文件，无需自己拼接
     *                     在public文件夹下创建index.html, 并在此文件中使用location.href跳转到指定文件连接
     * 
     *		 <script>
            	location.href = './login/index.html';
      		</script>
     */
    ```

     

## Webpack开发模式及应用

### Webpack开发模式

#### 目标

##### 了解不同打包模式对代码和环境的影响

#### 讲解

1. ##### [打包模式](https://webpack.docschina.org/configuration/mode/)：告知 Webpack 使用相应模式的内置优化

2. ##### 分类：

    | **模式名称** | **模式名字** | **特点**                         | 场景     |
    | ------------ | ------------ | -------------------------------- | -------- |
    | 开发模式     | development  | 调试代码，实时加载，模块热替换等 | 本地开发 |
    | 生产模式     | production   | 压缩代码，资源优化，更轻量等     | 打包上线 |

3. ##### 如何设置影响 Webpack呢？

    - ##### 方式1：在 webpack.config.js 配置文件设置 mode 选项

        ```js
        // ...
        
        module.exports = {
          // ...
          mode: 'production'
        }
        ```

        

    - ##### 方式2 (推荐使用）：在 package.json 命令行设置 mode 参数

        ```js
        "scripts": {
          "build": "webpack --mode=production",
          "dev": "webpack serve --open --mode=development"
        },
        ```

        

4. ##### 注意：命令行设置的优先级高于配置文件中的，推荐用命令行设置

5. ##### 体验：在 build 命令后 修改 mode 的值，打包输出观察打包后的 js 文件内容

    1.  production模式：极致压缩js代码，注重项目体积更小，更轻量，适配不同的浏览器环境

    2. development模式： 分解压缩js代码为一块一块的，注重代码热替换更快，让开发调试代码更便捷

        

### 应用 1: 根据打包模式，配置样式表模块的打包方式

#### 目标： 了解 Webpack 打包模式的应用

#### 讲解：

1. ##### 需求：在开发模式下用 style-loader 内嵌更快，在生产模式下提取 css 代码

2. ##### [方案](https://webpack.docschina.org/configuration/mode/)[1](https://webpack.docschina.org/configuration/mode/)：webpack.config.js 配置导出函数，但是局限性大（只接受 2 种模式）

    ##### 方案2：借助 cross-env （跨平台通用）包命令，设置参数区分环境

    ##### [方案](https://webpack.docschina.org/guides/production/)[3](https://webpack.docschina.org/guides/production/)：配置不同的 webpack.config.js （适用多种模式差异性较大情况）

3. ##### 主要使用方案 2 尝试，其他方案可以结合点击跳转的官方文档查看尝试

4. ##### 步骤：

    1.下载 cross-env 软件包到当前项目

    ```bash
    npm i cross-env --save-dev
    ```

    

    2.在 package.json 命令行设置，传入参数名和值（会绑定到 node.js 的 process.env 对象下）

    ```js
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "cross-env NODE_ENV=production webpack --mode=production",
        "dev": "cross-env NODE_ENV=development webpack serve --open --mode=development"
      },
    ```

    

    3.在 webpack.config.js 区分不同环境使用不同配置

    ```js
    module: {
        rules: [
            // 配置 css
          {
            test: /\.css$/i,
            // use: ['style-loader', "css-loader"],
            use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"]
          },
              // 配置 less
          {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader',
            ],
          }
        ],
      },
    ```

    

    4.重新打包观察两种配置区别

    ```bash
    npm run build
    ```

    ```bash
    npm run dev
    ```

    

### 应用 2: 根据打包模式，向前端注入环境变量

#### 目标： 前端项目中，开发模式下打印语句生效，生产模式下打印语句失效

#### 讲解

1. ##### 需求：前端项目中，开发模式下打印语句生效，生产模式下打印语句失效

2. ##### 问题：cross-env 设置的只在 Node.js 环境生效，前端代码无法访问 process.env.NODE_ENV

3. ##### [解决](https://webpack.docschina.org/plugins/define-plugin)：使用 Webpack 内置的 DefinePlugin 插件

4. ##### 作用：在编译时，将前端代码中匹配的变量名，替换为值或表达式

5. ##### 配置 webpack.config.js 中给前端注入环境变量

    ```js
    // ...
    const webpack = require('webpack')
    
    module.exports = {
      // ...
      plugins: [
        // ...
        new webpack.DefinePlugin({
          // key 是注入到打包后的前端 JS 代码中作为全局变量
          // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
      ]
    }
    ```

6. ##### 逻辑代码： 在入口js文件中编写：

    ```js
    if (process.env.NODE_ENV === "production") {
      console.log = () => {};
    }
    console.log("开发模式下打印语句生效，生成模式下打印语句失效");
    ```

7. ##### 重新打包观察两种配置区别

    ```bash
    npm run build
    ```

    ```bash
    npm run dev
    ```





## Webpack的优化



### 优化 1： 设置调试错误功能

#### 目标：在开发环境如何精准定位到报错源码位置

#### 讲解

1. ##### source map：可以准确追踪 error 和 warning 在原始代码的位置

2. ##### 问题：代码被压缩和混淆，无法正确定位源代码位置（行数和列数）

3. ##### 设置：webpack.config.js 配置 devtool 选项

    ```js
    // ...
    
    module.exports = {
      // ...
      devtool: 'inline-source-map'    // inline-source-map 选项：把源码的位置信息一起打包在 JS 文件内
    }
    ```

4. ##### 注意：source map 适用于开发环境，不要在生产环境使用（防止被轻易查看源码位置）

    ##### 	可以根据环境变量 ( process.env.NODE_ENV ) 的不同，决定是否开启此功能: 重新构建webpack.config.js代码结构

    ```js
    const config = {
      // 1. 打包JS功能
      // 入口
      entry: path.resolve(__dirname, "src/login/index.js"),
      // 出口
      output: {
        // ...
      },
    
      // 插件：给webpack提供更多功能
      plugins: [
       // ...
      ],
    
      // 加载器, 让webpack能打包跟多类型的模块
      module: {
       // ...
      },
    
      // 优化打包
      optimization: {
      //...
      },
    };
    
    // 调试错误
    if (process.env.NODE_ENV === "development") {
      config.devtool = "inline-source-map";
    }
    module.exports = config;
    ```

5. ##### 入口文件中，创造一个错误，重新打包观察两种配置区别

    ```js
    consolee.warn("1111");
    ```

    

### 优化 2： 设置路径别名，方便我们引入目标模块

#### 目标: 配置模块如何解析，创建 import 或 require 的别名，来确保模块引入变得更简单

#### 讲解

1. ##### 举例：原来路径如下：

    ```js
    import { checkPhone, checkCode } from '../src/utils/check.js'
    ```

    

2. ##### 配置解析别名：在 webpack.config.js 中设置

    ```js
    // ...
    
    const config = {
      // ...
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      }
    }
    ```

    

3. ##### 这样我们以后，引入目标模块写的路径就更简单了

    ```js
    import { checkPhone, checkCode } from '@/utils/check.js'
    ```

    

##### 4. 修改代码的路径后，重新打包观察效果是否正常！

### 

### 优化 3： 生产模式下使用CDN

#### 目标：开发模式使用本地第三方库，生产模式下使用 CDN 加载引入

#### 讲解

1. ##### 需求：开发模式使用本地第三方库，生产模式下使用 CDN 加载引入

2. ##### [CDN](https://developer.mozilla.org/zh-CN/docs/Glossary/CDN)[定义](https://developer.mozilla.org/zh-CN/docs/Glossary/CDN)：内容分发网络，指的是一组分布在各个地区的服务器

3. ##### 作用：把静态资源文件/第三方库放在 CDN 网络中各个服务器中，供用户就近请求获取

4. ##### 好处：减轻自己服务器请求压力，就近请求物理延迟低，配套缓存策略

5. ##### 步骤：

    1.在 html 中引入第三方库的 [CDN ](https://www.bootcdn.cn/)[地址](https://www.bootcdn.cn/)[ ](https://www.bootcdn.cn/)并用模板语法判断

    ```html
    <% if(htmlWebpackPlugin.options.useCdn){ %>
        <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css" rel="stylesheet">
    <% } %>
    ```

    ```html
    <% if(htmlWebpackPlugin.options.useCdn){ %>
        <script src="https://cdn.bootcdn.net/ajax/libs/axios/1.3.6/axios.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.min.js"></script>
      <% } %>
    ```

    

    2.配置 webpack.config.js 中 [externals](https://webpack.docschina.org/configuration/externals) 外部扩展选项（防止某些 import 的包被打包）

    ```js
    // 生产环境下使用相关配置
    if (process.env.NODE_ENV === 'production') {
      // 外部扩展（让 webpack 防止 import 的包被打包进来）
      config.externals = {
        // key：import from 语句后面的字符串
        // value：留在原地的全局变量（最好和 cdn 在全局暴露的变量一致）
        'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
        'axios': 'axios'
      }
    }
    ```

    

    ```js
    // ...
    const config = {
      // ...
      plugins: [
        new HtmlWebpackPlugin({
          // ...
          // 自定义属性，在 html 模板中 <%=htmlWebpackPlugin.options.useCdn%> 访问使用
          useCdn: process.env.NODE_ENV === 'production'
        })
      ]
    }
    ```

    

    3.两种模式下打包观察效果

    ```bash
    npm run build
    ```

    

## webpack 多页面的打包

### 目标

#### 让 Webpack 同时打包登录和内容列表页面

### 讲解

1. #### 概念：[单页面](https://developer.mozilla.org/zh-CN/docs/Glossary/SPA)：单个 html 文件，切换 DOM 的方式实现不同业务逻辑展示，后续 Vue/React 会学到

    #### 多页面：多个 html 文件，切换页面实现不同业务逻辑展示

2. #### 需求：把黑马头条-数据管理平台-内容页面一起引入打包使用

3. #### 步骤：

    1. ##### 准备源码（html，css，js）放入相应位置，并改用模块化语法导出

    2. ##### 下载 form-serialize 包并导入到核心代码中使用

    3. ##### 配置 webpack.config.js 多入口和多页面的设置

        ```js
        // ...
        const config = {
          entry: {
            '模块名1': path.resolve(__dirname, 'src/入口1.js'),
            '模块名2': path.resolve(__dirname, 'src/入口2.js'),
          },
          output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './[name]/index.js'  
          }
          plugins: [
            new HtmlWebpackPlugin({
              template: './public/页面2.html', // 模板文件
              filename: './路径/index.html', // 输出文件
              chunks: ['模块名2']
            })
            new HtmlWebpackPlugin({
              template: './public/页面2.html', // 模板文件
              filename: './路径/index.html', // 输出文件
              chunks: ['模块名2']
            })
          ]
        }
        ```

    4. ##### 重新打包观察效果

        

## webpack 多页面打包的优化：分割公共代码

### 目标：优化-分割功能代码

### 讲解

1. #### 需求：把 2 个以上页面引用的公共代码提取

2. #### 步骤：

    ##### 1.配置 webpack.config.js 的 splitChunks 分割功能

    ```js
    // ...
    const config = {
      // ...
      optimization: {
        // ...
        splitChunks: {
          chunks: 'all', // 所有模块动态非动态移入的都分割分析
          cacheGroups: { // 分隔组
            commons: { // 抽取公共模块
              minSize: 0, // 抽取的chunk最小大小字节
              minChunks: 2, // 最小引用数
              reuseExistingChunk: true, // 当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用
              name(module, chunks, cacheGroupKey) { // 分离出模块文件名
                const allChunksNames = chunks.map((item) => item.name).join('~') // 模块名1~模块名2
                return `./js/${allChunksNames}` // 输出到 dist 目录下位置
              }
            }
          }
        }
          
     
    ```

    ##### 2.打包观察效果

### 

