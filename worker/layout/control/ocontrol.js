import uuidv4 from 'uuid/v4';

export default class OControl{
  constructor(temp) {
    this.id = uuidv4();
    this.templete = temp;
    this.jqdom = null;
  }
}