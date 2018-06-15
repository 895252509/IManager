/**
 * @author zx
 * @since 2018/06/15
 * @description zrender 状态对象，记录操作状态
 */

const util = require('zrender').util;

export default class Status {
  constructor() {
    this.isMouseDown = false;
    this.clickX = null;
    this.clickY = null;
    this.clickShap = null;
    this.dragShap = null;
  }
  /*
  get isMouseDown() {
    return this.isMouseDown;
  }
  set isMouseDown(isdown) {
    this.isMouseDown = isdown;
  }

  get clickX() {
    return this.clickX;
  }
  set clickX(x) {
    this.clickX = x;
  }

  get clickY() {
    return this.clickY;
  }
  set clickY(y) {
    this.clickY = y;
  }
  get dragShap() {
    return this.dragShap;
  }
  set dragShap(shap) {
    this.dragShap = shap;
  }
  get clickShap() {
    return this.clickShap;
  }
  set clickShap(shap) {
    this.clickShap = shap;
  }
  */

  get clickPos() {
    return {
      clickX: this.clickX,
      clickY: this.clickY,
    };
  }
  set clickPos(pos) {
    util.merge(this, pos, true);
  }

  set status(obj) {
    util.merge(this, obj, true);
  }
}
