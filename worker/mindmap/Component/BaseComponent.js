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
      mm.status.hoverShap = this;
      mm.openDialog("attr",this.getSizes());
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
    return {
      shape: this.path_data.shape,
      position: {
        x: this.path_data.position[0],
        y: this.path_data.position[1],
      },

    }
  }

  attr(attr){
    this.path_data.attr({
      shape:{
        width: attr.shape.width,
        height: attr.shape.height,
        x: attr.shape.x - this.path_data.position[0],
        y: attr.shape.y - this.path_data.position[1],
      }
    });
  }
}
