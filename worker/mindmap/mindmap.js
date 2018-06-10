/**
 * @description 脑图对象
 * @augments dom:HTMLElement
 * @author zx
 * @since 2018/06/10
 */
const zrender = require('zrender');
const $ = require('jquery');

export default class MindMap {
  constructor(dom) {
    if (!(dom instanceof HTMLElement)) throw Error('初始化mindmap对象的参数应该是一个DOM对象！');
    this.dom = dom;
    /* let width = 0;
    width = dom.innerWidth;
    let height = 0;
    height = dom.innerHeight; */
    this.zr = zrender.init(this.dom);
    /**/
    $(dom).resize((e) => {
      e.preventDefault();
      this.zr.resize({
        width: 100,
        height: 100,
      });
    });
    this.zr.on('click', () => {
    });
  }

  resize(opts) {
    this.dom.style.width = opts.width || 100;
    this.dom.style.height = opts.height || 100;
    this.zr.resize(opts);
  }
}
