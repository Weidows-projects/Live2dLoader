<!--
 * @?: *********************************************************************
 * @Author: Weidows
 * @Date: 2022-03-20 22:26:55
 * @LastEditors: Weidows
 * @LastEditTime: 2022-03-25 11:39:48
 * @FilePath: \live2d-moc3\README.md
 * @Description:
 * @!: *********************************************************************
-->

<h1>

- ## 👉Live2d-moc3👈

your Final Choice since 2022.3

</h1>

<a>![分割线](https://cdn.jsdelivr.net/gh/Weidows/Images/img/divider.png)</a>

## 示例

> [示例页面](https://weidows-projects.github.io/live2d-moc3/) | [示例博客](https://weidows.github.io/)

- 看板

  <img src="https://cdn.jsdelivr.net/gh/litstronger/pic@master/project/live2d-moc3/demo1.webp" />

  <img src="https://cdn.jsdelivr.net/gh/litstronger/pic@master/project/live2d-moc3/demo3.webp" />

- 网页全屏

  <img src="https://cdn.jsdelivr.net/gh/litstronger/pic@master/project/live2d-moc3/demo6.webp" />

  <img src="https://cdn.jsdelivr.net/gh/litstronger/pic@master/project/live2d-moc3/demo4.webp" />

## 如何添加

- 三个必要的头:

  ```html
  <!-- Live2DCubismCore -->
  <script src="https://cdn.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2dcubismcore.min.js"></script>
  <!-- Include Pixi. -->
  <script src="https://cdn.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/pixi.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2d.min.js"></script>
  ```

- 以及自定义的 script :

  ```html
  <script>
    addEventListener("DOMContentLoaded", function () {
      let div = document.createElement("div");
      div.className = "Canvas";
      div.id = "L2dCanvas";
      document.body.appendChild(div);

      new Viewer({
        width: window.innerWidth,
        height: window.innerHeight,
        left: "0px",
        bottom: "0px",
        basePath:
          "https://cdn.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets",
        role: "bisimai_2",
        background:
          "https://cdn.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets/bg/bg_church_jp.png",
        opacity: 1,
        mobile: false,
      });
    });
  </script>
  ```

<a>![分割线](https://cdn.jsdelivr.net/gh/Weidows/Images/img/divider.png)</a>

## 比如 Hexo

添加到主题的 \_config.yml

js 代码可以写完参数后 [压缩为一行](https://c.runoob.com/front-end/51/),一起添加到下面;

当然也可以魔改框架源码,魔改方法多但是很繁琐

```yaml
inject:
  head:
    # - <link rel="stylesheet" href="/xxx.css">
    - <script src="https://cdn.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2dcubismcore.min.js"></script>
    - <script src="https://cdn.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/pixi.min.js"></script>
    - <script src="https://cdn.jsdelivr.net/gh/Weidows-projects/live2d-moc3/dist/live2d.min.js"></script>
  bottom:
    # - <script src="xxxx"></script>
    - <script>addEventListener("DOMContentLoaded",function(){let div=document.createElement("div");div.className="Canvas";div.id="L2dCanvas";document.body.appendChild(div);new Viewer({width:window.innerWidth,height:window.innerHeight,left:"0px",bottom:"0px",basePath:"https://cdn.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets",role:"bisimai_2",background:"https://cdn.jsdelivr.net/gh/alg-wiki/AzurLaneL2DViewer@gh-pages/assets/bg/bg_church_jp.png",opacity:1,mobile:false,})});</script>
```

<a>![分割线](https://cdn.jsdelivr.net/gh/Weidows/Images/img/divider.png)</a>

## 可选参数

| 参数                  | Type          | Default | Description                                                                             |
| --------------------- | ------------- | ------- | --------------------------------------------------------------------------------------- |
| width                 | 可选[Number]  | 800     | 宽度，单位为 px                                                                         |
| height                | 可选[Number]  | 600     | 长度，单位为 px                                                                         |
| top,right,bottom,left | 可选[String]  | ""      | 模型到浏览器各边框的距离。选择两个即可定位，如定位在左下角：left: '0px' , bottom: '0px' |
| basePath              | 必须[String]  | ""      | live2d 模型资源库的路径                                                                 |
| role                  | 必须[String]  | ""      | 角色模型对应的文件夹（即 basePath 下的文件夹                                            |
| background            | 可选[String]  | ""      | 背景图片，可填入图片外链                                                                |
| opacity               | 可选[Number]  | 1       | 模型透明度，0~1 取值                                                                    |
| mobile                | 可选[boolean] | true    | 移动端(手机)是否显示                                                                    |

- `basePath` 所使用的模型地址,推荐下面两个仓库,模型非常好看:

  [alg-wiki/AzurLaneL2DViewer](https://github.com/alg-wiki/AzurLaneL2DViewer)

  [imuncle/live2d](https://github.com/imuncle/live2d)

<a>![分割线](https://cdn.jsdelivr.net/gh/Weidows/Images/img/divider.png)</a>

## 借物表

> 项目基于[AzurLaneL2DViewer](https://github.com/alg-wiki/AzurLaneL2DViewer)修改

> https://cdn.jsdelivr.net/gh/litstronger/live2d-moc3@master/js/frame/live2dcubismcore.min.js \
> https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.6.1/pixi.min.js
