/**
 * @author zx
 * @since 2018/06/10
 */

import MindMap from '../worker/mindmap/mindmap.js';

const $ = require('jquery');

const mindmapDom = $('#main')[0];
const mindMap = new MindMap(mindmapDom);

$(window).on('resize', (e) => {
  // e.preventDefault();
  const width = window.innerWidth - 24;
  const height = window.innerHeight - 100;

  mindMap.resize({
    width,
    height,
  });

});

$(() => {
  $("#main").trigger("resize");
});

