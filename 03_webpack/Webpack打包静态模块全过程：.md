## Webpack打包静态模块全过程：

### 0. 打包前准备工作：

1. #### 项目文件夹中初始化包环境，生成 package.json 文件：

    ```bash
    npm init -y
    ```

2. #### 下载 webpack webpack-cli 到项目（版本独立）

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
        new MiniCssExtractPlugin()
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

    

### 5. 打包图片，音频，视频等资源模块：

