import OControl from './ocontrol';
import $ from 'jquery';

class TabControl extends OControl{
  constructor() {
    super();
    
    /**
     * TabPage 的数组
     */
    this.pages = [];

    this.hoverPage = null;

    this._id_main = `${this.id}_main`;

    this.templete = `
    <article id="${this.id}" class="tab-control">
      <header>

      </header>
      <main>

      </main>
    </article>
    `;

    this.jqdom = $(this.templete);
  }

  addPage(page){
    this.pages.push(page);
    const title = $(`<p data-id="${page.id}">${page.title}</p>`);
    this.jqdom.find("header").append(title);
    this.jqdom.find(`#${this._id_main}`).append(page.jqdom);
    title.on("click",(e)=>{
      this.selectPage(page);
    });
    if(this.pages.length === 1){
      this.hoverPage = this.pages[0];
      this.selectPage(this.hoverPage);
    }
  }

  selectPage(page){
    if(this.hoverPage){
      this.hoverPage.jqdom.removeClass('tab-section-hover');
      this.jqdom.find(`header p[data-id='${this.hoverPage.id}']`).removeClass('tab-title-hover');
    }
    this.jqdom.find(`header p[data-id='${page.id}']`).addClass('tab-title-hover');
    this.jqdom.find("section").filter(`#${page.id}`).addClass('tab-section-hover');
    this.hoverPage = page;
  }

  flush(){
    
  }

  tagTitleEvent(e){

  }
}

class TabPage extends OControl{
  constructor(title,content) {
    super();

    this.title = title;

    this.templete = `
    <section id="${this.id}">
      ${content}
    </section>
    `;

    this.jqdom = $(this.templete);

  }
}

export { TabControl, TabPage };