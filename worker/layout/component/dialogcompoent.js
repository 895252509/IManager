import OCompoent from './ocompoent';
import $ from 'jquery';

export default class DialogCompoent extends OCompoent{
  constructor(title="") {
    super();

    this.title = title;

    this._id_main = `${this.id}_main`;

    this.templete = 
    `<aside role="dialog" class="dialog hide" id="${this.id}">
      <header>
        ${this.title}
      </header>
      <main id="${this._id_main}">

      </main>
    </aside>`;

    this.jqdom = $(this.templete);
  }

  add(comp){
    this.jqdom.find(`#${this._id_main}`).append(comp.jqdom);
  }

  show(){
    const dig = $(`#${this.id}`);
    if(dig.length === 0){
      $("body").append(this.jqdom);
      this.jqdom.removeClass("hide");
    }else{
      this.jqdom.removeClass("hide");
    }
  }

  hide(){
    const dig = $(`#${this.id}`);
    if(dig.length === 0){}
    else{
      dig.addClass("hide");
    }
  }
}