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
      isMouseDown: false,
      clickX: 0,
      clickY: 0,
    };

    this.zr.on('mousedown', (e) => {
      this.status.isMouseDown = true;
      this.status.clickX = e.offsetX;
      this.status.clickY = e.offsetY;
    });

    this.zr.on('mousemove', (e) => {
      if (this.status.clickShap) return true;
      if (this.status.isMouseDown) {
        if (!this.status.dragShap) {
          if (e.offsetX - this.status.clickX === 0 ||
             e.offsetY - this.status.clickY === 0) return false;
          const func = () => Math.floor(Math.random() * 255);
          const linearColor = new zrender.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: `rgba(${func()},${func()},${func()},1)`,
          }, {
            offset: 1,
            color: `rgba(${func()},${func()},${func()},0.5)`,
          }]);
          const linearColor1 = new zrender.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255,0,0,0.5)',
          }, {
            offset: 1,
            color: '#efe3ff',
          }]);
          const rect = new zrender.Rect({
            shape: {
              x: this.status.clickX,
              y: this.status.clickY,
              width: e.offsetX - this.status.clickX,
              height: e.offsetY - this.status.clickY,
            },
            style: {
              stroke: '#ffc8aa',
              fill: linearColor,
            },
            draggable: true,
            z: 1,
          });

          rect.on('mousedown', (event) => {
            this.status.clickShap = event.target;
            /*  */
            this.zr.clearHover();
            this.zr.addHover(event.target, {
              style: {
                fill: linearColor1,
                stroke: '#ffc800',
              },
            });
          });
          rect.on('mouseup', () => {
            this.status.clickShap = null;
          });
          rect.on('mousemove', () => {

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
            z: 2,
          });
        }
      }
      return true;
    });
    this.zr.on('mouseup', () => {
      this.status = {
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
}
