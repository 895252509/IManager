import $ from 'jquery';
import OControl from './ocontrol';
import Eventable from '../core/Eventable';

export default class InputControl extends OControl {
  constructor(label = '', name = '', value = '') {
    super();

    this.value = value;
    this.name = name;
    this.labelStr = label;
    this.id_input = `${this.id}_input`;
    this.templete =
    `<div id="${this.id}">
      <label for="${this.id_input}">${this.labelStr}</label>
      <input id="${this.id_input}" value="${this.value}" name="${this.name}"/>
    </div>`;
    this.jqdom = $(this.templete);

    const labelDom = this.jqdom.find('label');
    const inputDom = this.jqdom.find(`#${this.id_input}`);
    labelDom.css({
      'vertical-align': 'middle',
      'margin-right': '8px',
    });

    inputDom.css({
      border: '1px solid',
      'vertical-align': 'middle',
    });

    inputDom.on('change', (e) => {
      Eventable
      this.trigger('change', e);
      this.parent.trigger('change', e);
    });
  }

  set val(val) {
    this.jqdom.find(`#${this.id_input}`).val(val);
  }

  get val() {
    return this.jqdom.find(`#${this.id_input}`).val();
  }

  set label(val) {
    this.jqdom.find('label').html(val);
  }

  get label() {
    return this.jqdom.find('label').html();
  }
}
