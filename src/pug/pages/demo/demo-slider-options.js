"use strict";

import Slider from '../slider.js';

class Menu {  

	constructor(obj){  
		 this.obj = obj;		 	
	}

	createMenu(){

		this.opt = {};			
		let elem = this.obj.elem;
		this.form = elem.querySelector('.menu');	
		this.firstPointer = elem.querySelector('.menu__firstPointer');
		this.secondPointer = elem.querySelector('.menu__secondPointer');
		this.min = elem.querySelector('.menu__min');
		this.max = elem.querySelector('.menu__max');
		this.plane = elem.querySelector('.menu__plane');
		this.quantityPointer = elem.querySelector('.menu__quantityPointer');
		this.indicator = elem.querySelector('.menu__indicator');

		this.form.addEventListener("submit", this.onSubmit.bind(this), false);		
	}

	onSubmit(event){  
		event.preventDefault(); 

		if (this.firstPointer.value != ''){
			this.opt.startFP = +this.firstPointer.value;
		};

		if (this.secondPointer.value != ''){
			this.opt.startSP = +this.secondPointer.value;
		};

		if (this.min.value != ''){
			this.opt.min = +this.min.value;
		};

		if (this.max.value != ''){
		this.opt.max = +this.max.value;
		};	

		this.opt.plane = this.plane.value;
		this.opt.quantityPointer = +this.quantityPointer.value;
		
		this.opt.indicator = this.indicator.value;
		
		try {
			this.obj.init(this.opt);
		} catch (error) {
			console.log(error)
		}
				
	}
}



const test1 = new Slider(document.querySelector('.slider-test1'), {
	indicator: 'visible',
	startFP: 1,
	startSP: 100,
	min: 0,
	max: 150, 
	plane: 'horizontal',
	quantityPointer: 2,		
});


const menu1 = new Menu(test1);
menu1.createMenu();



const test2 = new Slider(document.querySelector('.slider-test2'), {});
const menu2 = new Menu(test2);
menu2.createMenu();



const test3 = new Slider(document.querySelector('.slider-test3'),{});
test3.init({
	indicator: 'visible',
	startFP: 1,
	startSP: 100,
	min: 0,
	max: 150, 
	plane: 'horizontal',
	quantityPointer: 2,		
	
});

const test4 = new Slider(document.querySelector('.slider-test4'), {});  
test4.init({
	startFP: 50,
	startSP: 100,
	max: 200,
	plane: 'vertical', 
	quantityPointer: 2,   
});
 
