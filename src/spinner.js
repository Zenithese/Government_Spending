// import { Spinner } from 'spin.js';

// var opts = {
//     lines: 20, // The number of lines to draw
//     length: 80, // The length of each line
//     width: 18, // The line thickness
//     radius: 84, // The radius of the inner circle
//     scale: 0.75, // Scales overall size of the spinner
//     corners: 1, // Corner roundness (0..1)
//     color: '#00fdff', // CSS color or array of colors
//     fadeColor: 'transparent', // CSS color or array of colors
//     speed: 2.2, // Rounds per second
//     rotate: 49, // The rotation offset
//     animation: 'spinner-line-fade-default', // The CSS animation name for the lines
//     direction: -1, // 1: clockwise, -1: counterclockwise
//     zIndex: 2e9, // The z-index (defaults to 2000000000)
//     className: 'spinner', // The CSS class to assign to the spinner
//     top: '49%', // Top position relative to parent
//     left: '50%', // Left position relative to parent
//     shadow: '0 0 1px transparent', // Box-shadow for the lines
//     position: 'absolute' // Element positioning
// };

// var target = document.getElementById("circle");
// var spinner = new Spinner(opts).spin(target);

import scrollSnapPolyfill from 'css-scroll-snap-polyfill'

const init = function(){
    let items = document.querySelectorAll('section');
    for (let i = 0; i < items.length; i++){
        items[i].style.background = randomColor({luminosity: 'light'});
    }
    cssScrollSnapPolyfill()
}
init();