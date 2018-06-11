/**
 * @description 脑图对象
 * @augments dom:HTMLElement
 * @author zx
 * @since 2018/06/10
 */
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
    this.status = {
      isClick: false,
      clickX: 0,
      clickY: 0,
    };

    const circle = new zrender.Circle({
      shape: {
        cx: 150,
        cy: 50,
        r: 40,
      },
      draggable: true,
    });
    this.zr.add(circle);
    // this.zr.addHover(circle);
    this.zr.on('mousedown', (e) => {
      e.cancelBubble = true;
      this.status = {
        isClick: true,
        clickX: e.offsetX,
        clickY: e.offsetY,
        clickShap: null,
      };
    });

    this.zr.on('mousemove', (e) => {
      if (this.status.isClick) {
        if (!this.status.dragShap && !this.status.clickShap) {
          const rect = new zrender.Rect({
            shape: {
              x: this.status.clickX,
              y: this.status.clickY,
              width: e.offsetX - this.status.clickX,
              height: e.offsetY - this.status.clickY,
            },
            draggable: true,
          });
          rect.on('mousedown', (event) => {
            this.status.clickShap = event.target;
          });
          this.status.dragShap = rect;
          this.zr.add(rect);
        } else {
          this.status.dragShap.attr({
            shape: {
              x: this.status.clickX,
              y: this.status.clickY,
              width: e.offsetX - this.status.clickX,
              height: e.offsetY - this.status.clickY,
            },
          });
        }
      }
    });
    this.zr.on('mouseup', () => {
      this.status = {
        isClick: false,
        clickX: 0,
        clickY: 0,
        dragShap: null,
      };
    });
  }

  /**
   * 提供当外部DOM改变尺寸时，改变绑定DOM以及zrender对象的尺寸
   */
  resize(opts) {
    this.dom.style.width = opts.width || 100;
    this.dom.style.height = opts.height || 100;
    this.zr.resize(opts);
  }
}
