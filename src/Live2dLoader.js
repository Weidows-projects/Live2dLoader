/*
 * @!: *********************************************************************
 * @Author: Weidows
 * @LastEditors: Weidows
 * @Date: 2023-02-04 20:29:50
 * @LastEditTime: 2023-02-07 21:31:37
 * @FilePath: \Blog-private\source\_posts\Web\JavaScript\Live2dLoader\src\Live2dLoader.js
 * @Description: live2d loader
 * @?: *********************************************************************
 */

// import * as PIXI from "pixi.js";
// import * as live2d from "pixi-live2d-display";
// live2d = PIXI.live2d;

class Live2dLoader {
  constructor(models) {
    console.log(
      "%cLive2D using: https://github.com/Weidows-projects/Live2dLoader",
      "color: #6aff00;background: #0c222e;"
    );
    let config = models[this.getLive2dIndex(models)];
    if (!config.mobile && this.isMobile()) return;
    this.load(config);
  }

  getLive2dIndex(models) {
    let index = -1;

    document.cookie.split(";").forEach((cookie) => {
      // test=test
      let cookieMap = cookie.split("=");
      // live2d=1
      // 筛选出 live2d-cookie, 并作越界判断
      if (
        cookieMap[0].trim() == "live2d" &&
        cookieMap[1] >= 0 &&
        cookieMap[1] < models.length
      )
        index = cookieMap[1];
    });

    if (index === -1) {
      index = Math.floor(Math.random() * models.length);
      document.cookie =
        `live2d=${index}; expires=` +
        new Date(Date.now() + 86400e3).toUTCString();
    }
    return index;
  }

  isMobile() {
    var WIN = window;
    var LOC = WIN["location"];
    var NA = WIN.navigator;
    var UA = NA.userAgent.toLowerCase();

    function test(needle) {
      return needle.test(UA);
    }
    var IsAndroid = test(/android|htc/) || /linux/i.test(NA.platform + "");
    var IsIPhone = !IsAndroid && test(/ipod|iphone/);
    var IsWinPhone = test(/windows phone/);

    var device = {
      IsAndroid: IsAndroid,
      IsIPhone: IsIPhone,
      IsWinPhone: IsWinPhone,
    };
    var documentElement = WIN.document.documentElement;
    for (var i in device) {
      if (device[i]) {
        documentElement.className += " " + i.replace("Is", "").toLowerCase();
      }
    }
    return device.IsAndroid || device.IsIPhone || device.IsWinPhone;
  }

  async load(config) {
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    if (config.left) canvas.style.left = config.left;
    if (config.right) canvas.style.right = config.right;
    if (config.top) canvas.style.top = config.top;
    else if (config.bottom) canvas.style.bottom = config.bottom;
    else canvas.style.bottom = 0;
    if (config.opacity) canvas.style.opacity = config.opacity;
    if (config.background) {
      canvas.style.background = "url(" + config.background + ")";
      canvas.style.backgroundSize = "cover";
    }

    this.app = new PIXI.Application({
      view: document.getElementById("canvas"),
      width: config.width || 800,
      height: config.height || 600,
      transparent: true,
      antialias: true, // 抗锯齿
      autoStart: true,
    });
    this.model = await PIXI.live2d.Live2DModel.from(config.role);
    this.app.stage.addChild(this.model);
    this.model.position.set(
      canvas.style.width * 0.5,
      canvas.style.height * 0.5
    );
    this.model.scale.set(config.scale || 0.1);
    if (config.draggable === true) this.draggable(this.model);
    this.addListener(config, canvas, this.initMotionIndex());
  }

  // 可拖动
  draggable(model) {
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
      model.dragging = true;
      model._pointerX = e.data.global.x - model.x;
      model._pointerY = e.data.global.y - model.y;
    });
    model.on("pointermove", (e) => {
      if (model.dragging) {
        model.position.x = e.data.global.x - model._pointerX;
        model.position.y = e.data.global.y - model._pointerY;
      }
    });
    model.on("pointerupoutside", () => (model.dragging = false));
    model.on("pointerup", () => (model.dragging = false));
  }

  initMotionIndex() {
    let motionIndex = [],
      definitions = this.model.internalModel.motionManager.definitions[""];
    if (definitions)
      definitions.forEach((value, index) => {
        let file = this.model.internalModel.motionManager.getMotionFile(value);
        if (file.match("touch_head") != null) motionIndex[0] = index;
        else if (file.match("touch_special") != null) motionIndex[1] = index;
        else if (file.match("touch_body") != null) motionIndex[2] = index;
        // console.log(motionIndex, file);
      });
    return motionIndex;
  }

  addListener(config, canvas, motionIndex) {
    // 有的旧模型(比如lafei)不支持, 无法触发执行; 所以统一监听document的点击事件
    // this.model.on("hit", (hitAreas) => {});
    // this.model.emit("hit");

    document.addEventListener("click", (event) => {
      let offsetX = event.clientX - this.app.view.offsetLeft,
        offsetY = event.clientY - this.app.view.offsetTop;
      if (
        0 < offsetX &&
        offsetX < this.app.view.width &&
        0 < offsetY &&
        offsetY < this.app.view.height
      ) {
        if (config.pierceThrough !== false) {
          // 鼠标穿透, 先把 canvas 设为可穿透
          canvas.style.pointerEvents = "none";
          // 为该元素派发点击事件 https://www.blogwxb.cn/js%E4%B8%AD%E7%94%A8x%EF%BC%8Cy%E5%9D%90%E6%A0%87%E6%9D%A5%E5%AE%9E%E7%8E%B0%E6%A8%A1%E6%8B%9F%E7%82%B9%E5%87%BB%E5%8A%9F%E8%83%BD/
          document
            .elementsFromPoint(event.clientX, event.clientY)[0]
            .dispatchEvent(
              new MouseEvent("click", {
                bubbles: true, // 事件冒泡
                cancelable: true, // 默认事件
                view: window,
              })
            );
          canvas.style.pointerEvents = "auto";
        }

        let po = this.model.toModelPosition(new PIXI.Point(offsetX, offsetY)),
          hitAreas;

        if (Object.keys(this.model.internalModel.hitAreas).length == 0) {
          hitAreas = this.hitTest(po.x, po.y);
          if (hitAreas.includes("TouchHead")) {
            this.model.internalModel.motionManager.startMotion(
              "",
              motionIndex[0]
            );
          } else if (hitAreas.includes("TouchSpecial")) {
            this.model.internalModel.motionManager.startMotion(
              "",
              motionIndex[1]
            );
          } else if (hitAreas.includes("TouchBody")) {
            this.model.internalModel.motionManager.startMotion(
              "",
              motionIndex[2]
            );
          } else {
            this.model.internalModel.motionManager.startRandomMotion("");
          }
        } else {
          hitAreas = this.model.internalModel.hitTest(po.x, po.y);
          if (hitAreas.includes("head") || hitAreas.includes("Head")) {
            this.model.expression();
            this.model.motion("Tap");
          } else if (hitAreas.includes("body") || hitAreas.includes("Body")) {
            this.model.motion("tap_body");
            this.model.motion("Tap");
          } else this.model.motion("Tap");
        }
        console.log("Start motion: ", hitAreas.join(" / "));
      }
    });
  }

  hitTest(poX, poY) {
    let hitAreas = [];
    ["TouchHead", "TouchSpecial", "TouchBody"].forEach((id) => {
      let bounds = this.model.internalModel.getDrawableBounds(id);
      let b =
        bounds.x < poX &&
        poX < bounds.x + bounds.width &&
        bounds.y < poY &&
        poY < bounds.y + bounds.height;
      if (b) {
        hitAreas.push(id);
        // console.log(id);
      }
    });
    return hitAreas;
  }
}
