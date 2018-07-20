import { DialogCompoent, InputControl, TabControl, TabPage } from '../../layout/layout';

export default class GraphyAttrDialog extends DialogCompoent {
  constructor(title = '', model = null) {
    super(title);

    this.boxWidth = new InputControl('宽度(width):', model ? model.width : 0);

    this.boxHeight = new InputControl('高度(height):', model ? model.height : 0);

    this.boxPosX = new InputControl('位置(x):', model ? model.height : 0);

    this.boxPosY = new InputControl('位置(y):', model ? model.height : 0);

    this.boxPosX.change = e => this.change(e);
    this.boxPosY.change = e => this.change(e);
    this.boxWidth.change = e => this.change(e);
    this.boxHeight.change = e => this.change(e);

    const tab = new TabControl();
    tab.addPage(
      new TabPage('尺寸')
      .add(this.boxWidth)
      .add(this.boxHeight)
      .add(this.boxPosX)
      .add(this.boxPosY));

    this.add(tab);
  }

  set model(mod) {
    this.boxWidth.val = mod.shape.width;
    this.boxHeight.val = mod.shape.height;
    this.boxPosX.val = mod.shape.x + mod.position.x;
    this.boxPosY.val = mod.shape.y + mod.position.y;
  }
}
