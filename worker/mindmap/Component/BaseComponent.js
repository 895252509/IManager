/**
 * @author zx
 * @since 2018/06/15
 */

const zrender = require('zrender');

const util = zrender.util;

export default class BaseComponent {
  constructor(zr, opts) {
    this.mmp = zr;
    this.path = null;
    /**
     *
     */
    const defaultOpts = {
      shape: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      style: {
        stroke: 'rgba(0,0,0,1)',
        fill: 'rgba(255,255,255,1)',
      },
      draggable: true,
    };
    const opt = {};
    util.merge(opt, defaultOpts, true);
    util.merge(opt, opts, true);
    this.path = new zrender.Rect(opt);

    zr.zr.add(this.path);

    this.path.on('mousedown', (event) => {
      this.mmp.status.clickShap = event.target;
      /*
      this.zr.clearHover();
      this.zr.addHover(event.target, {
        style: {
          fill: linearColor1,
          stroke: '#ffc800',
        },
      }); */
    });

    this.path.on('mouseup', () => {
      this.mmp.status.clickShap = null;
    });
  }

  on(type, callback) {
    this.path.on(type, callback);
  }

  resize(size) {
    this.path.attr({
      shape: {
        width: size.width,
        height: size.height,
      },
    });
  }
}
