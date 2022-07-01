---
title: 👉live2d-moc3-web-集成渲染库
password: ""
tags:
  - live2d
  - JavaScript
katex: false
comments: true
aside: true
date: 2022-03-26 12:46:57
cover: https://www.helloimg.com/images/2022/03/26/RXQjJq.png
top_img:
---

<h2>

- # 👉Live2d-moc3👈

</h2>

[⏩ 文章地址/示例博客](https://weidows.github.io/post/Web/JavaScript/live2d-moc3/README) | [✔️ 仓库地址](https://github.com/Weidows-projects/live2d-moc3) | [👀 示例页面](https://weidows-projects.github.io/live2d-moc3/) 欢迎提交 pr !

<!--
 * @?: live2d************************************************
 * @Author: JavaScripteidows
 * @Date: 2022-03-20 22:26:55
 * @LastEditors: Weidows
 * @LastEditTime: 2022-06-28 03:50:58
 * @FilePath: \Blog-private\source\_posts\Web\JavaScript\live2d-moc3\README.md
 * @Description:
 * @!: *********************************************************************
-->

- [x] 支持 live2d-moc3 版本的 web 渲染库
- [x] 支持鼠标点击互动
- [ ] 拖动功能待修复
- [x] 2022.3.26 新增支持 [多模型] 异步加载 + 每日恒定随机模型 (每天更换自定义列表内随机模型,当日不再随刷新而替换)
- [x] 2022.5.23 已支持模型号越界判定,自动缩小到给定范围
- [x] 2022.6.28 鼠标穿透/防遮挡 + 支持眼球跟踪 + 模型缩放 API

<a>![分割线](https://www.helloimg.com/images/2022/07/01/ZM0SoX.png)</a>

## 如何添加

- 三个必要的头: <sup id='cite_ref-1'>[\[1\]](#cite_note-1)</sup> <sup id='cite_ref-2'>[\[2\]](#cite_note-2)</sup>

  ```html
  <!-- Live2DCubismCore -->
  <script src="https://fastly.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2dcubismcore.min.js"></script>
  <!-- Include Pixi. -->
  <script src="https://fastly.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/pixi.min.js"></script>
  <script src="https://fastly.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2d.min.js"></script>
  ```

- 以及自定义的 js, 单个/多个模型都可以, 但只显示一个, 想要多个可以多 new 几个

  ```js
  addEventListener("DOMContentLoaded", function () {
    let models = [
      {
        width: 800,
        height: 600,
        left: "0px",
        bottom: "0px",
        basePath:
          "https://fastly.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets",
        role: "bisimai_2",
        background: "",
        opacity: 1,
        mobile: false,
      },
      {
        width: 800,
        height: 600,
        right: "0px",
        bottom: "0px",
        basePath:
          "https://fastly.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets",
        role: "bisimai_2",
        background: "",
        opacity: 1,
        mobile: false,
      },
    ];
    new Live2dLoader(models);
  });
  ```

<a>![分割线](https://www.helloimg.com/images/2022/07/01/ZM0SoX.png)</a>

## 比如 Hexo

添加到主题的 \_config.yml

js 代码可以写完参数后 [压缩为一行](https://c.runoob.com/front-end/51/),一起添加到下面;

当然也可以魔改框架源码,此处不再赘述.

```yaml
inject:
  head:
    # - <link rel="stylesheet" href="/xxx.css">
    - <script src="https://fastly.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2dcubismcore.min.js"></script>
    - <script src="https://fastly.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/pixi.min.js"></script>
    - <script src="https://fastly.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2d.min.js"></script>
  bottom:
    # - <script src="xxxx"></script>
    - <script>addEventListener("DOMContentLoaded",function(){let models=[{left:"0px",bottom:"0px",basePath:"https://fastly.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets",role:"bisimai_2",background:"",opacity:1,mobile:false,},{right:"0px",bottom:"0px",basePath:"https://fastly.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets",role:"bisimai_2",background:"",opacity:1,mobile:false,},];new Live2dLoader(models)});</script>
```

<a>![分割线](https://www.helloimg.com/images/2022/07/01/ZM0SoX.png)</a>

## 可选参数

| 参数                  | Type          | Default | Description                                                                                                                                                                                   |
| --------------------- | ------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| width                 | 可选[Number]  | 800     | 宽度，单位为 px                                                                                                                                                                               |
| height                | 可选[Number]  | 600     | 长度，单位为 px                                                                                                                                                                               |
| top,right,bottom,left | 可选[String]  | ""      | 模型到浏览器各边框的距离。选择两个即可定位，如定位在左下角：left: '0px' , bottom: '0px'                                                                                                       |
| basePath              | 必须[String]  | ""      | live2d 模型资源库的路径,推荐下面仓库,模型非常好看 </br> [alg-wiki/AzurLaneL2DViewer](https://github.com/alg-wiki/AzurLaneL2DViewer) </br> [imuncle/live2d](https://github.com/imuncle/live2d) |
| role                  | 必须[String]  | ""      | 角色模型对应的文件夹（即 basePath 下的文件夹                                                                                                                                                  |
| background            | 可选[String]  | ""      | 背景图片，可填入图片外链                                                                                                                                                                      |
| opacity               | 可选[Number]  | 1       | 模型透明度，(0,1] 取值                                                                                                                                                                        |
| mobile                | 可选[boolean] | true    | 移动端(手机)是否显示                                                                                                                                                                          |
| scale                 | 可选[Number]  | 0.06    | 模型缩放比例，(0,1] 取值                                                                                                                                                                      |

<a>![分割线](https://www.helloimg.com/images/2022/07/01/ZM0SoX.png)</a>

## Q-A

### 模型问题报错

- 关于报错含有 `reading ‘_ptr’` 的, 是模型不适配问题 (#2)

  ```
  live2dcubismcore.min.js:1
  Uncaught TypeError: Cannot read properties of null (reading ‘_ptr’)
  at new Model (live2dcubismcore.min.js:1:138485)
  at Function.Model.fromMoc (live2dcubismcore.min.js:1:138707)
  at l2d.js💯60
  at t.value (mini-signals.js:93:1)
  at e.t._onComplete (Loader.js:568:1)
  at Loader.js:608:1
  at s (async.js:27:1)
  at e. (interactiveTarget.js:82:5)
  at Loader.js:590:1
  at async.js:35:1
  ```

  检验过并不是配置文件哪里有问题, 单纯是二进制模型 .png/.moc3 问题, 想修复的话要修复模型

---

### 怎么刷新

![](https://www.helloimg.com/images/2022/05/23/ZRyZgz.png)

---

### 模型太小问题

对于评论中提到的模型显示太小, 现在可以设置 `scale` 参数来解决了

<a>![分割线](https://www.helloimg.com/images/2022/07/01/ZM0SoX.png)</a>

## 借物表

> 项目基于[AzurLaneL2DViewer](https://github.com/alg-wiki/AzurLaneL2DViewer)修改

<a name='cite_note-1' href='#cite_ref-1'>[1]</a>: https://fastly.jsdelivr.net/gh/litstronger/live2d-moc3@master/js/frame/live2dcubismcore.min.js

<a name='cite_note-2' href='#cite_ref-2'>[2]</a>: https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.6.1/pixi.min.js
