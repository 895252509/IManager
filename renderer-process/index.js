/**
 * @author zx
 * @since 2018/06/10
 */

import MindMap from '../worker/mindmap/mindmap.js';

const {fabric} = require('fabric');

const $ = require('jquery');

const mindmapDom = $('#main')[0];
//const mindMap = new MindMap(mindmapDom);

$(window).on('resize', (e) => {
  // e.preventDefault();
  const width = window.innerWidth - 24;
  const height = window.innerHeight - 100;
/*
  mindMap.resize({
    width,
    height,
  });
*/
});

$(() => {
  $(window).trigger('resize');
  var canvas = new fabric.Canvas('main');
  var red = new fabric.Rect({
    top: 0, left: 0, width: 80, height: 50, fill: 'red' });
  var blue = new fabric.Rect({
    top: 0, left: 100, width: 50, height: 70, fill: 'blue' });
  var green = new fabric.Rect({
    top: 100, left: 100, width: 60, height: 60, fill: 'green' });
  fabric.Object.prototype.transparentCorners = true;
  canvas.add(red, blue, green);
});

