import $ from 'jquery';
import OCompoent from './ocompoent';

export default class DialogCompoent extends OCompoent {
  constructor(title = '') {
    super();

    this.title = title;

    this.id_main = `${this.id}_main`;

    this.templete =
    `<aside role="dialog" class="dialog hide" id="${this.id}" draggable="true">
      <header >
        <span class="dialog-title">${this.title}</span>
        <span class="dialog-btn-close">X</span>
      </header>
      <main id="${this.id_main}">

      </main>
    </aside>`;

    this.jqdom = $(this.templete);

    /**
     * 点击关闭按钮
     * 仅仅隐藏html
     */
    this.jqdom.find('.dialog-btn-close').on('click', () => {
      this.jqdom.addClass('hide');
    });

    /**
     * 拖动对话框的实现
     * 暂时简单的利用dragable来实现，后期考虑更换利用鼠标事件的方式实现
     * 目前只有一个bug就是在输入框内拖动的时候也会拖动整个对话框
     */
    let offsetClickX = 0;
    let offsetClickY = 0;
    this.jqdom.on('dragstart', (e) => {
      offsetClickX = e.clientX - $(e.target)[0].offsetLeft;
      offsetClickY = e.clientY - $(e.target)[0].offsetTop;
    });
    this.jqdom.on('dragend', (e) => {
      $(e.target).css('left', `${e.clientX - offsetClickX}px`);
      $(e.target).css('top', `${e.clientY - offsetClickY}px`);
    });
  }

  /**
   * 添加一个控件在对话框中
   * @param {extends OObj} comp 一个控件对象
   */
  add(comp) {
    this.jqdom.find(`#${this.id_main}`).append(comp.jqdom);
  }

  /**
   * 显示对话框
   */
  show() {
    const dig = $(`#${this.id}`);
    if (dig.length === 0) {
      $('body').append(this.jqdom);
      this.jqdom.removeClass('hide');
    } else {
      this.jqdom.removeClass('hide');
    }
  }

  /**
   * 隐藏对话框
   */
  hide() {
    const dig = $(`#${this.id}`);
    if (dig.length === 0);
    else {
      dig.addClass('hide');
    }
  }
}
