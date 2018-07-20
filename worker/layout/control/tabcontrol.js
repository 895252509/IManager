import $ from 'jquery';
import OControl from './ocontrol';

class TabControl extends OControl {
  constructor() {
    super();

    /**
     * TabPage 的数组
     */
    this.pages = [];

    this.hoverPage = null;
    this.id_main = `${this.id}_main`;

    this.templete = `
    <article id="${this.id}" class="tab-control">
      <header>

      </header>
      <main id="${this.id_main}">

      </main>
    </article>
    `;
    this.jqdom = $(this.templete);
  }

  addPage(page) {
    this.pages.push(page);
    const title = $(`<p data-id="${page.id}">${page.title}</p>`);
    this.jqdom.find('header').append(title);
    this.jqdom.find(`#${this.id_main}`).append(page.jqdom);
    title.on('click', () => {
      this.selectPage(page);
    });
    if (this.pages.length === 1) {
      this.hoverPage = this.pages[0];
      this.selectPage(this.hoverPage);
    }
  }

  selectPage(page) {
    if (this.hoverPage) {
      this.hoverPage.jqdom.removeClass('tab-section-hover');
      this.jqdom.find(`header p[data-id='${this.hoverPage.id}']`).removeClass('tab-title-hover');
    }
    this.jqdom.find(`header p[data-id='${page.id}']`).addClass('tab-title-hover');
    this.jqdom.find('section').filter(`#${page.id}`).addClass('tab-section-hover');
    this.hoverPage = page;
  }

  // flush() {
  //   return 1;
  // }

  // tagTitleEvent() {

  // }
}

class TabPage extends OControl {
  constructor(title) {
    super();

    this.title = title;

    this.templete = `
    <section id="${this.id}">
    </section>
    `;

    this.jqdom = $(this.templete);
  }

  add(cont) {
    this.jqdom.append(cont.jqdom);
    return this;
  }
}

export { TabControl, TabPage };
