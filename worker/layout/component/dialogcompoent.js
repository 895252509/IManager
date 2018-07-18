import OCompoent from './ocompoent';
import $ from 'jquery';

export default class DialogCompoent extends OCompoent{
  constructor(title="") {
    super();

    this.title = title;

    this._id_main = `${this.id}_main`;

    this.templete = 
    `<aside role="dialog" class="dialog hide" id="${this.id}" draggable="true">
      <header >
        <span class="dialog-title">${this.title}</span>
        <span class="dialog-btn-close">X</span>
      </header>
      <main id="${this._id_main}">

      </main>
    </aside>`;

    this.jqdom = $(this.templete);

    this.jqdom.find(`.dialog-btn-close`).on("click",()=>{
      this.jqdom.addClass("hide");
    });

    let offsetClickX = 0;
    let offsetClickY = 0;
    this.jqdom.on("dragstart", (e)=>{
      offsetClickX = e.clientX - $(e.target)[0].offsetLeft;
      offsetClickY = e.clientY - $(e.target)[0].offsetTop;
    });
    this.jqdom.on("dragend", (e)=>{
      $(e.target).css("left",`${e.clientX - offsetClickX}px`);
      $(e.target).css("top",`${e.clientY - offsetClickY}px`);
    });
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