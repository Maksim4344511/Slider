"use strict";

import {Slider} from './slider.js';
import {SliderVertical} from './slider-vertical.js';

const test = new Slider(document.querySelector('.slider-wrap'), {
  startFP: 10,
  startSP: 500,  
});
test.init();

const test1 = new Slider(document.querySelector('.slider-test'), {
  startFP: 10,
  startSP: 500,  
});
test1.init();

const test2 = new Slider(document.querySelector('.slider-test2'), {
  startFP: 10,
  startSP: 500,  
},);
test2.init();

const test3 = new SliderVertical(document.querySelector('.slider-test3'), {
  startFP: 10,
  startSP: 500,  
},);  
test3.init();
