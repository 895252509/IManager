import EventableObj from '../core/Eventable';

export default class OControl extends EventableObj {
  constructor(temp) {
    super();

    this.templete = temp;
    this.jqdom = null;
  }
}
