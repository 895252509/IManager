/**
 * @author zx
 * @since 2018/06/15
 */

const zrender = require('zrender');

export default class BaseComponent {
  constructor(mm, opts) {
    this.path_data = new zrender.Rect(opts);

    this.path_data.on("mousedown",(e)=>{
      mm.status.clickShap = this;
      mm.openDialog("attr");
    });
    this.path_data.on('mouseup', () => {
      mm.status.clickShap = null;
    });
    mm.zr.add(this.path_data);
  }

  resize(size) {
    this.path_data.attr({
      shape:{
        x: size.x,
        y: size.y,
        width: size.width,
        height: size.height,
      }
    });
  }

  getSizes(){
    return this.path_data.shape;    
  }
}
