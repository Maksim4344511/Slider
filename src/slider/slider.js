"use strict";

import './slider.scss';

class Slider {
	title = document.createElement('div');
	dial = document.createElement('div'); 
	dialColor = document.createElement('div');
	firstPointer = document.createElement('div');
	secondPointer = document.createElement('div');
	firstValue = document.createElement('div');
	secondValue = document.createElement('div');
	// firstInputValue = document.createElement('input'); // FIXME:
	// secondInputValue = document.createElement('input');
	config = {
		indicator: 'visible',
		startFP: 10,
		startSP: 20,
		min: 0,
		max: 30, 
		plane: 'horizontal',
		quantityPointer: 2,	
		title: "Slider",
	};

	constructor(elem) {
		this.elem = elem;
		this.onPointerMove = this.onPointerMove.bind(this);
		this.onPointerUp = this.onPointerUp.bind(this);
	}

	init(opt) {
		this.config = Object.assign(this.config, opt);
			
		_render(this, this.elem, this.options); // создает HTML слайдера 

		this.firstPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
		this.secondPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
		this.dial.addEventListener('pointerdown', this.onDialDown.bind(this), false); 

		if (this.wrap.querySelector('.slider-second-input')) {		
			this.firstInputValue.addEventListener('blur', this.onBlurFirstInput.bind(this), false); 
		};

		if (this.wrap.querySelector('.slider-second-input')) {
			this.secondInputValue.addEventListener('blur', this.onBlurSecondInput.bind(this), false);
		};
	}

	onBlurFirstInput() {
		_onBlurFirstInput(this);
	}

	onBlurSecondInput() {
		_onBlurSecondInput(this);
	}

	onDialDown(event) { // клик по шкале передвигает ближайший ползунок
		_onDialDown(this, event); 
	}

	onPointerDown(event) {  // фиксирует таргет на зажжатом ползунке
		document.addEventListener('pointermove',  this.onPointerMove, false);
		document.addEventListener('pointerup', this.onPointerUp, false);
		_onPointerDown(this, event);  
	}

	onPointerMove(event) {   // передвигает зажатый ползунок
		_onPointerMove(this, event);      
	}
	
	onPointerUp() {    // отменяет зажатие и передвижиние ползунка
		document.removeEventListener('pointerup', this.onPointerUp);
		document.removeEventListener('pointermove', this.onPointerMove);
	}
}

function _render(slider, elem) {
	slider.wrap = elem; 
	slider.scale = (slider.config.max - slider.config.min) / 10;
	_error(slider);
	
	slider.wrap.prepend(slider.dial);
	slider.dial.className = 'slider-dial';

	slider.title.className = 'slider-title';
	slider.title.innerHTML = slider.config.title;
	slider.wrap.prepend(slider.title);		

	slider.dial.append(slider.dialColor);
	slider.dialColor.className = 'slider-dial__color';
	
	slider.firstPointer.className = 'slider-pointer1';
	slider.dial.append(slider.firstPointer);	

	if (slider.config.quantityPointer === 2) {
		slider.firstPointer.style.left = ((slider.config.startFP - slider.config.min) * (slider.dial.offsetWidth - slider.firstPointer.offsetWidth) / 10 / slider.scale);
		slider.firstPointer.style.display = '';
		
	} else if (slider.config.quantityPointer === 1) {
		slider.firstPointer.style.display = 'none';
		slider.firstPointer.style.left = 0; 
	};

	slider.secondPointer.className = 'slider-pointer2';
	slider.dial.append(slider.secondPointer); 
	slider.secondPointer.style.left =  ((slider.config.startSP - slider.config.min) * (slider.dial.offsetWidth - slider.secondPointer.offsetWidth) / 10 / slider.scale);
	
	slider.firstValue.className = 'slider-value1';
	slider.firstValue.innerHTML = slider.config.startFP; 
	slider.firstPointer.append(slider.firstValue);
	slider.firstValue.style.display = slider.firstPointer.style.display;

	if (slider.wrap.querySelector('.slider-first-input')) {
		slider.firstInputValue = slider.wrap.querySelector('.slider-first-input');
		slider.firstInputValue.value = slider.firstValue.innerHTML;
		slider.firstInputValue.style.display = slider.firstPointer.style.display;
	};

	slider.secondValue.className = 'slider-value2';
	slider.secondValue.innerHTML = slider.config.startSP ;
	slider.secondPointer.append(slider.secondValue); 

	if (slider.wrap.querySelector('.slider-second-input')) {
		slider.secondInputValue = slider.wrap.querySelector('.slider-second-input');
		slider.secondInputValue.value = slider.secondValue.innerHTML;
	};

	if (slider.config.plane === 'vertical') {
		slider.dial.classList.add('rotate');
		slider.firstValue.classList.add('rotate1');
		slider.secondValue.classList.add('rotate2')
	};

	if (slider.config.quantityPointer === 2) {
		slider.dialColor.style.left = slider.firstPointer.offsetLeft + slider.secondPointer.offsetWidth / 2;
		slider.dialColor.style.width = slider.secondPointer.offsetLeft - slider.firstPointer.offsetLeft;
	} else if (slider.config.quantityPointer === 1) {
		slider.dialColor.style.left = 0;
		slider.dialColor.style.width = slider.secondPointer.offsetWidth / 2 + slider.secondPointer.offsetLeft; 
	};
 
	if (slider.firstPointer.offsetLeft === slider.secondPointer.offsetLeft && slider.firstPointer.offsetLeft === 0) {
		slider.focus = 'second';
		slider.firstPointer.style.zIndex = 1;
		slider.secondPointer.style.zIndex = 2;
	} else {
		slider.focus = 'first';
		slider.firstPointer.style.zIndex = 2;
		slider.secondPointer.style.zIndex = 1;
	};
}

function _onDialDown(slider, event) {
	let dial = slider.dial;
	let firstPointer = slider.firstPointer;
	let secondPointer = slider.secondPointer;
	let dialShiftX;
	
	if (event.target === dial || event.target === slider.dialColor) {
		let rightEdge = dial.offsetWidth - secondPointer.offsetWidth;

		if(slider.config.plane === 'horizontal') {

			dialShiftX = event.clientX - firstPointer.offsetWidth / 2 - dial.getBoundingClientRect().left;

			if ((dialShiftX - firstPointer.offsetLeft) ** 2 < (dialShiftX - secondPointer.offsetLeft) ** 2 && slider.config.quantityPointer === 2 ||
			(slider.firstValue.innerHTM === slider.secondValue.innerHTM) && (dialShiftX < slider.firstPointer.offsetLeft)) {
				if (dialShiftX - firstPointer.offsetWidth < 0) { dialShiftX = 0; }; 				

				slider.firstPointer.style.left = dialShiftX;

			} else if ((dialShiftX - firstPointer.offsetLeft) ** 2 > (dialShiftX - secondPointer.offsetLeft) ** 2 ||
				(slider.firstValue.innerHTM === slider.secondValue.innerHTM) && (dialShiftX > slider.firstPointer.offsetLeft)) {					
					if (dialShiftX > rightEdge ) {	dialShiftX = rightEdge;	}; 

				slider.secondPointer.style.left = dialShiftX;

			} else if ((slider.config.quantityPointer === 1)) {				
				slider.secondPointer.style.left = dialShiftX;
				slider.firstPointer.style.left = 0;
			};

	} else if (slider.config.plane === 'vertical'){
		dialShiftX = dial.getBoundingClientRect().bottom - event.clientY - firstPointer.offsetWidth / 2;
		
		if ((dialShiftX - firstPointer.offsetLeft) ** 2 < (dialShiftX - secondPointer.offsetLeft) ** 2 && slider.config.quantityPointer === 2 ||
		(slider.firstValue.innerHTM === slider.secondValue.innerHTM) && (dialShiftX < slider.firstPointer.offsetLeft)) {
			if (dialShiftX - firstPointer.offsetWidth < 0) { dialShiftX = 0; };

			slider.firstPointer.style.left = dialShiftX;

		} else if ((dialShiftX - firstPointer.offsetLeft) ** 2 > (dialShiftX - secondPointer.offsetLeft) ** 2 ||
		(slider.firstValue.innerHTM === slider.secondValue.innerHTM) && (dialShiftX > slider.firstPointer.offsetLeft)) {
			if (dialShiftX > rightEdge) { dialShiftX = rightEdge; }; 

			slider.secondPointer.style.left = dialShiftX;

		} else if ((dialShiftX - firstPointer.offsetLeft) ** 2 < (dialShiftX - secondPointer.offsetLeft) ** 2 && slider.config.quantityPointer === 1) {
			if (dialShiftX > rightEdge) { dialShiftX = rightEdge; }; 

			slider.firstPointer.style.left = 0;
			slider.secondPointer.style.left = dialShiftX;
		};
	};

		if (slider.config.quantityPointer === 2) {
			slider.dialColor.style.left = slider.firstPointer.offsetLeft + slider.secondPointer.offsetWidth / 2;
			slider.dialColor.style.width = slider.secondPointer.offsetLeft - slider.firstPointer.offsetLeft ;
		} else if (slider.config.quantityPointer === 1) {
			slider.dialColor.style.left = 0;
			slider.dialColor.style.width = slider.secondPointer.offsetWidth / 2 + slider.secondPointer.offsetLeft;
		};

		slider.firstValue.innerHTML = Math.round((+firstPointer.offsetLeft / (rightEdge)) * 10 * slider.scale) + slider.config.min;
		
		if (slider.wrap.querySelector('.slider-first-input')) {	slider.firstInputValue.value = slider.firstValue.innerHTML;	};

		slider.secondValue.innerHTML = Math.round((+slider.secondPointer.offsetLeft / (rightEdge)) * 10 * slider.scale) + slider.config.min;

		if (slider.wrap.querySelector('.slider-second-input')) { slider.secondInputValue.value = slider.secondValue.innerHTML; };
	};
}

function _onPointerDown(slider, event) {
	let firstPointer = slider.firstPointer;
	let secondPointer = slider.secondPointer;

	if (slider.config.plane === 'horizontal') {
	if (event.target === firstPointer) { 
		slider.focus = 'first';
		firstPointer.style.zIndex = 2;
		secondPointer.style.zIndex = 1;
		firstPointer.shiftX = event.clientX - firstPointer.getBoundingClientRect().left;
	
	} else if (event.target === secondPointer) {
		slider.focus = 'second'; 
		secondPointer.shiftX = event.clientX - secondPointer.getBoundingClientRect().left;
		firstPointer.style.zIndex = 1;
		secondPointer.style.zIndex = 2;
	};
	} else if (slider.config.plane === 'vertical') {
	if (event.target === firstPointer) {
		slider.focus = 'first';
		firstPointer.style.zIndex = 2;
		secondPointer.style.zIndex = 1;
		firstPointer.shiftX = event.clientY - firstPointer.getBoundingClientRect().top;
	} else if (event.target === secondPointer) {
		slider.focus = 'second';
		firstPointer.style.zIndex = 1;
		secondPointer.style.zIndex = 2;
		secondPointer.shiftX = event.clientY - secondPointer.getBoundingClientRect().top;
		};
	};
}

function _onPointerMove(slider, event) {
	let dial = slider.dial;
	let firstPointer = slider.firstPointer;
	let secondPointer = slider.secondPointer;
	let rightEdge = dial.offsetWidth - secondPointer.offsetWidth;
	let newLeftFirstP;
	let newLeftSecondP;
	
	if (slider.focus === 'first') { 
		if (slider.config.plane === 'horizontal') {
			newLeftFirstP = event.clientX - firstPointer.shiftX - dial.getBoundingClientRect().left;
		} else if (slider.config.plane === 'vertical') {
			newLeftFirstP =  dial.getBoundingClientRect().bottom - event.clientY - (firstPointer.offsetWidth - firstPointer.shiftX);
		};

		if (newLeftFirstP < 0) { newLeftFirstP = 0; };

		if (newLeftFirstP >= +secondPointer.offsetLeft) { newLeftFirstP = +secondPointer.offsetLeft; };

		firstPointer.style.left = newLeftFirstP;
		slider.firstValue.innerHTML = Math.round((+firstPointer.offsetLeft / (rightEdge)) * 10 * slider.scale) + slider.config.min;

		if (slider.wrap.querySelector('.slider-first-input')) {	slider.firstInputValue.value = slider.firstValue.innerHTML;	};

		slider.dialColor.style.left = newLeftFirstP + slider.secondPointer.offsetWidth / 2;
		slider.dialColor.style.width = secondPointer.offsetLeft - firstPointer.offsetLeft;

	} else if (slider.focus === 'second') {
			if (slider.config.plane === 'horizontal') {
				newLeftSecondP = event.clientX - secondPointer.shiftX - dial.getBoundingClientRect().left;
			} else if (slider.config.plane === 'vertical') {
				newLeftSecondP = dial.getBoundingClientRect().bottom - event.clientY - (secondPointer.offsetWidth - secondPointer.shiftX);
			};

			if (newLeftSecondP > rightEdge) { newLeftSecondP = rightEdge; };
			
			if (newLeftSecondP < +firstPointer.offsetLeft) { newLeftSecondP = +firstPointer.offsetLeft; };

		secondPointer.style.left = newLeftSecondP;
		slider.secondValue.innerHTML = Math.round((+slider.secondPointer.offsetLeft / (rightEdge)) * 10 * slider.scale) + slider.config.min;
		slider.dialColor.style.width = +secondPointer.offsetLeft - +firstPointer.offsetLeft;

		if (slider.wrap.querySelector('.slider-second-input')) { slider.secondInputValue.value = slider.secondValue.innerHTML; };
	};
}

function _onBlurFirstInput(slider) {
	if (+slider.firstInputValue.value < slider.config.min) {
		slider.firstInputValue.value = slider.config.min;
	};

	if (+slider.firstInputValue.value > +slider.secondInputValue.value) {
		slider.firstInputValue.value = slider.secondInputValue.value;
	};

	slider.firstPointer.style.left = ((slider.firstInputValue.value - slider.config.min) * (slider.dial.offsetWidth - slider.firstPointer.offsetWidth) / 10 / slider.scale);
	slider.firstValue.innerHTML = slider.firstInputValue.value;	    
	slider.dialColor.style.left = slider.firstPointer.offsetLeft + slider.secondPointer.offsetWidth / 2;
	slider.dialColor.style.width = slider.secondPointer.offsetLeft - slider.firstPointer.offsetLeft ;
}

function _onBlurSecondInput(slider){
	if (+slider.secondInputValue.value > slider.config.max) {
		slider.secondInputValue.value = slider.config.max;
	};

	if (+slider.secondInputValue.value < +slider.firstInputValue.value) {
		slider.secondInputValue.value = slider.firstInputValue.value;
	};

	slider.secondPointer.style.left =  ((slider.secondInputValue.value - slider.config.min) * (slider.dial.offsetWidth - slider.secondPointer.offsetWidth) / 10 / slider.scale);
	
	slider.secondValue.innerHTML = slider.secondInputValue.value;
	slider.dialColor.style.left = slider.firstPointer.offsetLeft + slider.secondPointer.offsetWidth / 2;
	slider.dialColor.style.width = slider.secondPointer.offsetLeft - slider.firstPointer.offsetLeft;
}


function _error(slider){
	if (slider.config.quantityPointer != 2 && slider.config.quantityPointer != 1) {
		throw new Error('Ошибка: количество ползунков 1 или 2');
	};

	if (typeof(slider.config.startFP) != 'number' || typeof(slider.config.startSP) != 'number') {
		throw new Error('Стартовое значение ползунка должно быть числом');
	};

	if (isNaN(slider.config.startFP) || isNaN(slider.config.startSP)) {
		throw new Error ('Стартовое значение ползунка должно быть числом');
	};

	if (typeof(slider.config.min) != 'number' || typeof(slider.config.max) != 'number') {
		throw new Error('Минимальное и максимальное значения слайдера должны быть числом');
	};

	if (isNaN(slider.config.min) || isNaN(slider.config.max)) {
		throw new Error('Стартовое значение ползунка должно быть числом');
	};
	
	if (slider.config.startFP < slider.config.min || slider.config.startFP > slider.config.max) {
		slider.config.startFP = slider.config.min;	
		alert("Стартовое значение ползунка не должно выходить за пределы min и max слайдера");
	};

	if (slider.config.startSP > slider.config.max || slider.config.startSP < slider.config.min) {
		slider.config.startSP = slider.config.max;
		alert("Стартовое значение ползунка не должно выходить за пределы min и max слайдера");
	};

	if (slider.config.startFP > slider.config.startSP) {
		slider.config.startFP = slider.config.min;
		slider.config.startSP = slider.config.max;	
		alert("Стартовое значение первого ползунка не могут привышать значение второго");
	};
}


export default Slider;
