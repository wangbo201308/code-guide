概述
---
欢迎使用`前端代码规范`，使用过程中如碰到问题，请到[Github](https://github.com/wangbo201308/code-guide/issues)进行提问。


## 关于

`前端代码规范` 是由 Skieer前端团队 整理的，基于 [W3C](http://www.w3.org/)、[苹果开发者](https://developer.apple.com/)和[Airbnb JavaScript Style guide](https://github.com/airbnb/javascript) 等官方文档 ，并结合团队日常业务需求以及团队在日常开发过程中总结提炼出的经验而制定。

旨在增强团队开发协作、提高代码质量和打造开发基石的编码规范，以下规范是团队基本约定的内容，必须严格遵循。


#### HTML规范

基于 [W3C](http://www.w3.org/)、[苹果开发者](https://developer.apple.com/) 等官方文档，并结合团队业务和开发过程中总结的规范约定，让页面HTML代码更具语义性。

#### 图片规范

了解各种图片格式特性，根据特性制定图片规范，包括但不限于图片的质量约定、图片引入方式、图片合并处理等，旨在从图片层面优化页面性能。

#### CSS规范

统一规范团队 CSS 代码书写风格和使用 CSS 预编译语言语法风格，提供常用媒体查询语句和浏览器私有属性引用，并从业务层面统一规范常用模块的引用。

#### 命名规范

从 `目录`、`图片`、`HTML/CSS文件`、`ClassName` 的命名等层面约定规范团队的命名习惯，增强团队代码的可读性。

#### JavaScript 规范

统一团队的 JS 语法风格和书写习惯，减少程序出错的概率，其中也包含了 ES6 的语法规范和最佳实践。

##  路线图
![路线图](https://github.com/wangbo201308/code-guide/blob/master/resource/roadmap.png)

## 如何使用
代码规范在项目中的应用主要包括代码实时检测和代码提交前的代码检查。
### 代码实时检测（以VsCode为例）
   1. 安装依赖 `ESLint` 及对应的 `plugin`（若已安装可忽略），安装依赖 `stylelint` 及对应的 `plugin`（若已安装可忽略）。
   ```` javascript
    yarn add ESLint eslint-plugin-reac --dev
    yarn add stylelint stylelint-config-standard  stylelint-config-prettier --dev
   ````
   1. 安装VsCode插件 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 和 [stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)。
   2. 复制最新的 `.elintrc ` 文件和 ` .stylelintrc.json` 文件至项目根目录下（若已有可忽略）。
   3. 为防止VsCode内置的 `linter` 和 `stylelint` 对同一错误重复报错，需在VsCode的 ` Settings ` 中将内置 `linter` 禁用。
   ```` javascript
    "css.validate": false,
    "less.validate": false,
    "scss.validate": false
   ````
### 代码检查
#### 原理
##### Git Hooks
和许多其他的版本控制系统一样， 当某些重要的动作发生时 `Git` 也能触发对应的定制化的脚本，这种方式被叫做 [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)。 [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 主要有两类：客户端钩子和服务端钩子。前者主要由 `commit` 和 `merge` 等操作触发，后者主要由 `pre-receive`等操作触发，且主要用于CI流程的处理。`pre-commit` 钩子主要用于提交前的代码格式检查和单元测试。

` Git Hooks ` 都存储在Git目录下的hooks子目录，在大多数项目中是 ` .git/hooks `目录。当使用 `git init` 初始化一个项目时，Git会在该目录下创建一系列的示例钩子。
##### Husky
`Husky` 实际时一个为Git增加钩子的工具，借助它可以实现自动在 `.git/hooks` 下增加对应的钩子。
##### lint-staged
`lint-staged` 主要用于对进入Git暂存区并且将要提交的文件进行操作，从而可以避免对于整个项目中的所有文件进行操作。
##### prettier
`prettier` 主要用于格式化代码。
#### 实施
1. 安装 `husky` `lint-staged` `prettier`等依赖。
   ```
   yarn add husky lint-staged prettier --dev
   ```
2. 复制最新的 `.prettierrc` 文件至项目根目录下。
3. 在 `package.json` 文件中编写对应的脚本。

