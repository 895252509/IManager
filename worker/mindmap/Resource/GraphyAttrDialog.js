import { DialogCompoent, InputControl, TabControl, TabPage } from '../../layout/layout';

export default class GraphyAttrDialog extends DialogCompoent {
  constructor(title = '', model = null) {
    super(title);

    this.boxWidth = new InputControl('宽度(width):', model ? model.width : 0);
    this.boxHeight = new InputControl('高度(height):', model ? model.height : 0);
    this.boxPosX = new InputControl('位置(x):', model ? model.position.x : 0);
    this.boxPosY = new InputControl('位置(y):', model ? model.position.y : 0);
    const tab = new TabControl();
    tab.addPage(
      new TabPage('尺寸')
      .add(this.boxWidth)
      .add(this.boxHeight)
      .add(this.boxPosX)
      .add(this.boxPosY));
    this.add(tab);
    this.boxPosX.on('change', (e) => {
      this.trigger('change',e);
    });
    this.boxPosY.on('change', (e) => {
      this.trigger('change',e);
    });
    this.boxWidth.on('change', (e) => {
      this.trigger('change',e);
    });
    this.boxHeight.on('change', (e) => {
      this.trigger('change',e);
    });

    this.transfromPosX = new InputControl('水平位移(x):', model ? model.position.x : 0);
    this.transfromPosY = new InputControl('垂直位移(y):', model ? model.position.y : 0);
    tab.addPage(
      new TabPage('转换')
      .add(this.transfromPosX)
      .add(this.transfromPosY));
    
    this.transfromPosX.on('change', (e) => {
      this.trigger('change',e);
    });
    this.transfromPosY.on('change', (e) => {
      this.trigger('change',e);
    });
  }

  set model(mod) {
    this.boxWidth.val = mod.shape.width;
    this.boxHeight.val = mod.shape.height;
    this.boxPosX.val = mod.shape.x + mod.position.x;
    this.boxPosY.val = mod.shape.y + mod.position.y;
    this.transfromPosX.val = mod.position.x;
    this.transfromPosY.val = mod.position.y;
  }

  get model(){
    return {
      shape: {
        x: this.boxPosX.val,
        y: this.boxPosY.val,
        width: this.boxWidth.val,
        height: this.boxHeight.val,
      },
    }
  }
}
