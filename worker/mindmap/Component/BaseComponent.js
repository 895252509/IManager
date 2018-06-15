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
    this.path.attr({
      style: {
        text: this.path.id,
      }
    });
    zr.zr.add(this.path);

    this.path.on('mousedown', (event) => {
      this.mmp.status.clickShap = event.target;
      console.log('mousedown', event.target.id);
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

    this.path.on('dragenter', (event) => {
      console.log('dragenter', event.target.id);
    });
    this.path.on('dragleave', (event) => {
      console.log('dragleave', event.target.id);
    });
    this.path.on('drop', (event) => {
      console.log('drop', event.target.id);
    });
    this.path.on('dropend', (event) => {
      console.log('dropend', event.target.id);
    });
    this.path.on('drag', (event) => {
      this.checkCoincide(event.target);
      console.log('drag', event.target.id);
    });
  }

  on(type, callback) {
    this.path.on(type, callback);
  }

  checkCoincide(path) {
    const otherPath = this.mmp.zr.storage.getDisplayList();
    let resu;
    for (const ipath of otherPath) {
      if (ipath === path) continue;
      resu = path.getBoundingRect().intersect(ipath.getBoundingRect());
      if (resu) {
        console.warn(`${path.id} enter ${ipath.id}`);
        return true;
      }
    }
    console.log(`${path.id} no enter`);
    return false;
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
