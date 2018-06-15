/**
 * @description 脑图对象
 * @augments dom:HTMLElement
 * @author zx
 * @since 2018/06/10
 */
import Status from './Core/Status';
import BaseComponent from './Component/BaseComponent';

const zrender = require('zrender');

// const $ = require('jquery');

export default class MindMap {
  /**
   * 构造函数
   */
  constructor(dom) {
    if (!(dom instanceof HTMLElement)) throw Error('初始化mindmap对象的参数应该是一个DOM对象！');
    // 对象属性
    this.dom = dom;
    // 对象属性
    this.zr = zrender.init(this.dom);
    // 对象属性
    this.status = new Status();

    this.zr.on('mousedown', (e) => {
      this.status.status = {
        isMouseDown: true,
        clickX: e.offsetX,
        clickY: e.offsetY,
      };
    });

    this.zr.on('mousemove', (e) => {
      if (this.status.clickShap) return true;
      if (this.status.isMouseDown) {
        if (!this.status.dragShap) {
          if (e.offsetX - this.status.clickX === 0 ||
             e.offsetY - this.status.clickY === 0) return false;

          const rect = new BaseComponent(this, {
            shape: {
              x: this.status.clickX,
              y: this.status.clickY,
              width: e.offsetX - this.status.clickX,
              height: e.offsetY - this.status.clickY,
            },
          });

          this.status.dragShap = rect;
        } else {
          if (this.checkCoincide(this.status.dragShap)) return true;
          this.status.dragShap.resize({
            width: e.offsetX - this.status.clickX,
            height: e.offsetY - this.status.clickY,
          });
        }
      }
      return true;
    });

    this.zr.on('mouseup', () => {
      this.status.status = {
        isMouseDown: false,
        clickX: 0,
        clickY: 0,
        dragShap: null,
      };
    });

    /*
    this.zr.on('mousewheel', (event) => {
      const origin = [event.offsetX, event.offsetY];
      const sc = event.wheelDelta / 50;
      const list = this.zr.storage.getDisplayList();
      for (const sub of list) {
        const oldo = sub.origin;
        sub.origin = origin;
        sub.scale = sub.scale.map(num => num + sc);
        sub.dirty();
      }
    });
    */
  }
  /**
   * 提供当外部DOM改变尺寸时，改变绑定DOM以及zrender对象的尺寸
   */
  resize(opts) {
    this.dom.style.width = opts.width || 100;
    this.dom.style.height = opts.height || 100;
    this.zr.resize(opts);
  }

  checkCoincide(path) {
    const otherPath = this.zr.storage.getDisplayList();
    let resu;
    for (const ipath of otherPath) {
      if (ipath === path.path) continue;
      resu = path.path.getBoundingRect().intersect(ipath.getBoundingRect());
      if (resu) return true;
    }
    return false;
  }
}
