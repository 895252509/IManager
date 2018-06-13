/**
 * @author zx
 * @since 2018/06/10
 */

import MindMap from '../worker/mindmap/mindmap.js';

const $ = require('jquery');

const mindmapDom = $('#main')[0];
const mindMap = new MindMap(mindmapDom);
$(mindMap.dom);
$(window).on('resize', (e) => {
  e.preventDefault();
  const width = window.innerWidth - 16;
  const height = window.innerHeight - 100;
  /* $(mindmapDom).prop('width', `${width}px`);
  $(mindmapDom).prop('height', `${height}px`); */
  /* mindmapDom.style.width = width;
  mindmapDom.style.height = height;
  $(mindmapDom).resize(); */
  mindMap.resize({
    width,
    height,
  });
});

$(() => {
  $(window).trigger('resize');
});

