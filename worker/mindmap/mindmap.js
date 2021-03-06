import BaseComponent from './Component/BaseComponent';
import GraphyAttrDialog from './Resource/GraphyAttrDialog';

/**
 * @description 脑图对象
 * @augments dom:HTMLElement
 * @author zx
 * @since 2018/06/10
 */
const zrender = require('zrender');
const uuidv4 = require('uuid/v4');

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
    //
    this.models = [];
    // 对象属性
    this.status = {
      isClick: false,
      clickX: 0,
      clickY: 0,
    };

    this.attrDia = new GraphyAttrDialog('属性');

    this.attrDia.on('change', () => {
      this.status.hoverShap.attr(this.attrDia.model);
    });

    this.uuid = uuidv4();

    this.zr.on('mousedown', (e) => {
      this.status.isClick = true;
      this.status.clickX = e.offsetX;
      this.status.clickY = e.offsetY;
    });

    this.zr.on('mousemove', (e) => {
      if (this.status.clickShap) return true;
      if (this.status.isClick) {
        if (!this.status.dragShap) {
          if (e.offsetX - this.status.clickX === 0 ||
            e.offsetY - this.status.clickY === 0) return false;

          const com = new BaseComponent(this, {
            shape: {
              x: this.status.clickX,
              y: this.status.clickY,
              width: e.offsetX - this.status.clickX,
              height: e.offsetY - this.status.clickY,
            },
            draggable: true,
          });
          this.models.push(com);
          this.status.dragShap = com;
        } else {
          this.status.dragShap.resize({
            x: this.status.clickX,
            y: this.status.clickY,
            width: e.offsetX - this.status.clickX,
            height: e.offsetY - this.status.clickY,
          });
        }
      }
      return true;
    });
    this.zr.on('mouseup', () => {
      this.status.isClick = false;
      this.status.clickX = 0;
      this.status.clickY = 0;
      this.status.dragShap = null;
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

  /**
   * 提供对话框用来设置图形属性
   */
  openDialog(dialogName, attr) {
    this.attrDia.model = attr;
    this.attrDia.show();
  }
}
