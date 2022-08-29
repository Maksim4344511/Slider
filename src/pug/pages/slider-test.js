"use strict";

import {Slider} from './slider.js';


const test1 = new Slider(document.querySelector('.slider-test1'), {
  startFP: 1000,
  startSP: 450000,
  max: 1000000,
  plane: 'horizontal',
  min: 100, 
});
test1.init();

const test2 = new Slider(document.querySelector('.slider-test2'), {
  startFP: 5,
  startSP: 50,
  value: 'none',
  
});
test2.init();

const test3 = new Slider(document.querySelector('.slider-test3'), {
  startFP: 4,
  startSP: 9,
  max: 10, 
  min: 2,
  plane: 'horizontal', 
  
});
test3.init();

const test4 = new Slider(document.querySelector('.slider-test4'), {
  startFP: 10,
  startSP: 100,
  max: 200,
  plane: 'vertical',    
});  
test4.init();

