const $ = require('jquery');
import InputControl from '../worker/layout/control/inputcontrol';
import { TabControl,TabPage } from '../worker/layout/control/tabcontrol';

$(document).ready(function (){
  const uuidv4 = require('uuid/v4');
  console.time("create");
  const widget = new InputControl("点击量","clickNum",0);
  const tab = new TabControl();
  const page = new TabPage("尺寸","内容1");
  const page1 = new TabPage("样式","内容2");
  tab.addPage(page);
  tab.addPage(page1);
  $("body").append(widget.jqdom);
  $("body").append(tab.jqdom);
  console.timeEnd("create");
});