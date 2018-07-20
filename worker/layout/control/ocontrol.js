import OObj from '../baseclass/oobj';

export default class OControl extends OObj {
  constructor(temp) {
    super();

    this.templete = temp;
    this.jqdom = null;
  }
}
