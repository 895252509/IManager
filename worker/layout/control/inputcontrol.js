import OControl from './ocontrol';
import $ from 'jquery';

export default class InputControl extends OControl{
  constructor(label="",name="",value="") {
    super();
    this.value = value;
    this.name =name;
    this.labelStr = label;
    this.templete = `
    <label for="${this.id}">${this.labelStr}
    </label><input id="${this.id}" value="${this.value}" name="${this.name}"/>
    `
    this.jqdom = $(this.templete);

    const labelDom = this.jqdom.filter(`label`);
    const inputDom = this.jqdom.filter(`#${this.id}`);
    labelDom.css({
      "vertical-align" : "middle",
      "margin-right" : "8px"
    });

    inputDom.css({
      "border" : "1px solid",
      "vertical-align" : "middle"
    });
  }

  set val(val){
    this.jqdom.filter(`#${this.id}`).val(val);
  }

  get val(){
    return this.jqdom.filter(`#${this.id}`).val();
  }

  set label(val){
    this.jqdom.filter(`label`).html(val);
  }

  get label(){
    return this.jqdom.filter(`label`).html();
  }
}