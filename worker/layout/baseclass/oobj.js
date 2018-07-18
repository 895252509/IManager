import uuid from 'uuid/v4';

export default class OObj{
  constructor() {
    this.id = uuid();
    this.templete = "";
  }
}