"use strict";

import {Slider} from './slider.js';


const test1 = new Slider(document.querySelector('.slider-test1'), {
  startFP: 10,
  startSP: 100000,
  max: 2000000,
  plane: 'horizontal',    
});
test1.init();

const test2 = new Slider(document.querySelector('.slider-test2'), {
  startFP: 10,
  startSP: 500,
  
});
test2.init();

const test3 = new Slider(document.querySelector('.slider-test3'), {
  startFP: 10,
  startSP: 500,  
});
test3.init();

const test4 = new Slider(document.querySelector('.slider-test4'), {
  startFP: 10,
  startSP: 100,
  max: 200,
  plane: 'vertical',    
});  
test4.init();
