const zrender = require('zrender');
const $ = require('jquery');
/* maindom.attr('width', `${width}px`);
maindom.attr('height', `${height}px`);
*/

$(window).on('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const maindom = $('#main');
  maindom[0].style.width = `${width}px`;
  maindom[0].style.height = `${height}px`;
  const zr = zrender.init($('#main')[0]);
  const circle = new zrender.Circle({
    shape: {
      cx: 150,
      cy: 50,
      r: 40,
    },
    style: {
      fill: 'none',
      stroke: '#F00',
    },
  });
  zr.add(circle);
});
