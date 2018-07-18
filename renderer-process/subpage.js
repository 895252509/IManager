import $ from 'jquery';
import { TabControl,TabPage,InputControl,DialogCompoent } from '../worker/layout/layout';

$(document).ready(function (){
  console.time("create");
  const widget = new InputControl("点击量","clickNum",0);
  const tab = new TabControl();
  const page = new TabPage("尺寸","内容1");
  const page1 = new TabPage("样式","内容2");
  const page2 = new TabPage("事件","内3");
  const dia = new DialogCompoent("属性");
  tab.addPage(page);
  tab.addPage(page1);
  dia.add(tab);
  dia.add(widget);
  dia.show();
  tab.addPage(page2);
  
  console.timeEnd("create");
});