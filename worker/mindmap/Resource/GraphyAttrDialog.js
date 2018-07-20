import { DialogCompoent } from '../../layout/layout';

export default class GraphyAttrDialog extends DialogCompoent {
  constructor() {
    super();

    this.model = null;
  }

  set model(mod) {
    this.model = mod;
  }
}
