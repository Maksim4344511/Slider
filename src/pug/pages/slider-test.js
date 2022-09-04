"use strict";

import {Slider} from './slider.js';


const test1 = new Slider(document.querySelector('.slider-test1'), {
  indicator: 'visible',
	startFP: 'sdf',
	startSP: -20,
	min: -10,
	max: 20, 
	plane: 'horizontal',
	quantityPointer: 2, 
  
});
test1.init();

const test2 = new Slider(document.querySelector('.slider-test2'), {
  startFP: 5,
  startSP: 10,
  indicator: 'none',
  quantityPointer: 2,
  
});
test2.init();

const test3 = new Slider(document.querySelector('.slider-test3'), {
  startFP: 4,
  startSP: 10,
  max: 10, 
  min: 0,
  plane: 'horizontal', 
  quantityPointer: 1, 
  
});
test3.init();

const test4 = new Slider(document.querySelector('.slider-test4'), {
  startFP: 10,
  startSP: 100,
  max: 200,
  plane: 'vertical', 
  quantityPointer: 2,   
});  
test4.init();

