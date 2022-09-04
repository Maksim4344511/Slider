"use strict";

import {} from './utils.js';
import {_createMenu, _onChange} from './slider-menu.js';

class Slider {  
  config = {
	indicator: 'visible',
	startFP: 10,
	startSP: 20,
	min: 0,
	max: 10, 
	plane: 'horizontal',
	quantityPointer: 2, 
	
  }; 

  constructor(elem, options){  
		 
   	_render(this, elem, options) //создает HTML слайдера  
		
		
  }

  init(){ 
	
  	this.onPointerMove = this.onPointerMove.bind(this);
		this.onPointerUp = this.onPointerUp.bind(this);
		this.firstPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
		this.secondPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);   
		
		this.dial.addEventListener('pointerdown', this.onDialDown.bind(this), false); 	
		
  }

	
/*
  onChange(){ 
		_onChange(this);   // выбор количество ползунков в шоу-меню  
  }

  onClick(event){    // сохраняет настройки в шоу меню
		event.preventDefault(); 
		this.dialColor.style.backgroundColor= 'red';        
  }
*/
  onDialDown(event){ // клик по шкале передвигает ближайший ползунок  

	_onDialDown(this, event)  
  }


  onPointerDown(event){  //фиксирует таргет на зажжатом ползунке

		document.addEventListener('pointermove',  this.onPointerMove, false); 
		document.addEventListener('pointerup', this.onPointerUp, false);     
		_onPointerDown(this, event);  
  }

  onPointerMove(event){   // передвигает зажатый ползунок
		_onPointerMove(this, event);      
  }
	
  onPointerUp(){    //отменяет зажатие и передвижиние ползунка

		document.removeEventListener('pointerup', this.onPointerUp); 
		document.removeEventListener('pointermove', this.onPointerMove); 
  }
}




function _render(slider, elem, options){
	slider.wrap = elem;      
	
	slider.config = Object.assign(slider.config, options);	
	

	slider.title = document.createElement('div');
	slider.dial = document.createElement('div'); 
	slider.dialColor = document.createElement('div');  
	slider.firstPointer = document.createElement('div');
	slider.secondPointer = document.createElement('div');
	slider.firstValue = document.createElement('div');
	slider.secondValue = document.createElement('div'); 
	
	slider.scale = (slider.config.max - slider.config.min) / 10;   

	slider.title.className = 'slider-title';
	slider.title.innerHTML = 'Range slider';
	slider.wrap.append(slider.title);
	_error(slider);
	
	slider.wrap.append(slider.dial);
	slider.dial.className = 'slider-dial';

	if(slider.config.plane === 'vertical') {

		slider.dial.classList.add('rotate');
	};       
		
	slider.dial.append(slider.dialColor);
	slider.dialColor.className = 'slider-dial__color';  
	
	
	slider.firstPointer.className = 'slider-Pointer1';
	slider.dial.append(slider.firstPointer);

	if(slider.config.quantityPointer === 2){

		slider.firstPointer.style.left = ((slider.config.startFP - slider.config.min) * (slider.dial.offsetWidth - slider.firstPointer.offsetWidth) / 10 / slider.scale) + 'px'; 

	} else if (slider.config.quantityPointer === 1){

		slider.firstPointer.style.display = 'none';
		slider.firstPointer.style.left = 0; 
	};

	slider.secondPointer.className = 'slider-Pointer2';
	slider.dial.append(slider.secondPointer); 
	slider.secondPointer.style.left =  ((slider.config.startSP - slider.config.min) * (slider.dial.offsetWidth - slider.secondPointer.offsetWidth) / 10 / slider.scale) + 'px';
	
	if (slider.config.indicator === 'visible'){

		slider.firstValue.className = 'slider-value1';
		slider.firstValue.innerHTML = slider.config.startFP;    
		slider.firstPointer.append(slider.firstValue);
		slider.firstValue.style.display = slider.firstPointer.style.display;
		slider.firstValue.style.left = - 7 * slider.firstValue.innerHTML.length;
		
		slider.secondValue.className = 'slider-value2';
		slider.secondValue.innerHTML = slider.config.startSP ;
		slider.secondPointer.append(slider.secondValue); 
	};

	if (slider.config.quantityPointer === 2){

		slider.dialColor.style.left = +slider.firstPointer.style.left.slice(0, -2) +'px';
		slider.dialColor.style.width = +slider.secondPointer.style.left.slice(0, -2) - +slider.firstPointer.style.left.slice(0, -2) +'px';

	}else if (slider.config.quantityPointer === 1){

		slider.dialColor.style.left = 0;
		slider.dialColor.style.width = +slider.secondPointer.style.left.slice(0, -2); 
	};    
}



function _onDialDown (slider, event){
	let dial = slider.wrap.querySelector('.slider-dial');
	let firstPointer = slider.wrap.querySelector('.slider-Pointer1');
	let secondPointer = slider.wrap.querySelector('.slider-Pointer2');
	let dialSfiftX;
	
		if (event.target === dial || event.target ===slider.dialColor){
		
		let rightEdge = dial.offsetWidth - secondPointer.offsetWidth;

		if(slider.config.plane === 'horizontal'){        
			
			dialSfiftX = event.clientX - firstPointer.offsetWidth / 2 - dial.getBoundingClientRect().left;

			if ((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === 2){

				if (dialSfiftX - firstPointer.offsetWidth < 0) {

					dialSfiftX = 0;
				}; 

				slider.firstPointer.style.left = dialSfiftX + 'px';

			} else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 > (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){

					if (dialSfiftX > rightEdge ) {

						dialSfiftX = rightEdge;        
					}; 
				slider.secondPointer.style.left = dialSfiftX + 'px';  

			} else if (((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === 1)){
				
				if (dialSfiftX > rightEdge ) {

					dialSfiftX = rightEdge;        
				}; 
				slider.secondPointer.style.left = dialSfiftX + 'px'; 
				slider.firstPointer.style.left = 0;
			};


	} else if (slider.config.plane === 'vertical'){

			dialSfiftX = dial.getBoundingClientRect().bottom - event.clientY - firstPointer.offsetWidth / 2;
			
			if ((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === 2){

				if (dialSfiftX - firstPointer.offsetWidth < 0) {

					dialSfiftX = 0;
				}; 

				slider.firstPointer.style.left = dialSfiftX + 'px';

			} else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 > (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){

				if (dialSfiftX > rightEdge) {

					dialSfiftX = rightEdge;        
				}; 

			slider.secondPointer.style.left = dialSfiftX + 'px'; 

			} else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === 1){
				if (dialSfiftX > rightEdge) {

					dialSfiftX = rightEdge;        
				}; 

				slider.firstPointer.style.left = 0;
				slider.secondPointer.style.left = dialSfiftX + 'px';  
			};
		};

		slider.dialColor.style.left = +slider.firstPointer.style.left.slice(0, -2) +'px';
		slider.dialColor.style.width = +slider.secondPointer.style.left.slice(0, -2) - +slider.firstPointer.style.left.slice(0, -2) +'px';

		slider.firstValue.innerHTML = Math.round((+firstPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * slider.scale) + slider.config.min;
		slider.firstValue.style.left = - 7 * slider.firstValue.innerHTML.length;
		slider.secondValue.innerHTML = Math.round((+slider.secondPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * slider.scale) + slider.config.min;
	};
}

function _onPointerDown(slider, event){
	let firstPointer = slider.wrap.querySelector('.slider-Pointer1');
  let secondPointer = slider.wrap.querySelector('.slider-Pointer2');
  
  if(slider.config.plane === 'horizontal') { 

	if (event.target === firstPointer){ 

	  slider.focus = 'first';        
	  firstPointer.style.zIndex = 2;
	  secondPointer.style.zIndex = 1;
	  firstPointer.shiftX = event.clientX - firstPointer.getBoundingClientRect().left; 
	
	} else if (event.target === secondPointer){

	  slider.focus = 'second'; 
	  secondPointer.shiftX = event.clientX - secondPointer.getBoundingClientRect().left; 
	  firstPointer.style.zIndex = 1;
	  secondPointer.style.zIndex = 2;       
	};  

  } else if (slider.config.plane === 'vertical'){

	if (event.target === firstPointer){ 

		slider.focus = 'first';
		firstPointer.style.zIndex = 2;
		secondPointer.style.zIndex = 1;
		firstPointer.shiftX = event.clientY - firstPointer.getBoundingClientRect().top; 

	} else if (event.target === secondPointer){

		slider.focus = 'second';
		firstPointer.style.zIndex = 1;
		secondPointer.style.zIndex = 2;
		secondPointer.shiftX = event.clientY - secondPointer.getBoundingClientRect().top;
	  }; 
	};        
}	

function _onPointerMove(slider, event){
	let dial = slider.wrap.querySelector('.slider-dial');
	let firstPointer = slider.wrap.querySelector('.slider-Pointer1');
	let secondPointer = slider.wrap.querySelector('.slider-Pointer2');  
	let rightEdge = dial.offsetWidth - secondPointer.offsetWidth;  
	let newLeftFirstP;
	let newLeftSecondP;

	if (slider.focus === 'first'){ 

		if (slider.config.plane === 'horizontal'){

			newLeftFirstP = event.clientX - firstPointer.shiftX - dial.getBoundingClientRect().left;

		} else if (slider.config.plane === 'vertical'){
			newLeftFirstP =  dial.getBoundingClientRect().bottom - event.clientY - (firstPointer.offsetWidth - firstPointer.shiftX); 
		}

		if (newLeftFirstP < 0) {
			newLeftFirstP = 0;
		};

		if (newLeftFirstP >= +secondPointer.style.left.slice(0, -2)){
			newLeftFirstP = +secondPointer.style.left.slice(0, -2);
		};

		firstPointer.style.left = newLeftFirstP + 'px';
		slider.firstValue.innerHTML = Math.round((+firstPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * slider.scale) + slider.config.min;
		slider.firstValue.style.left = - 7 * slider.firstValue.innerHTML.length; //что-бы не накладывались друг на друга
		
		slider.dialColor.style.left = newLeftFirstP + 'px';
		slider.dialColor.style.width = +secondPointer.style.left.slice(0, -2) - +firstPointer.style.left.slice(0, -2) +'px';

	} else if (slider.focus === 'second'){

			if (slider.config.plane === 'horizontal'){
				newLeftSecondP = event.clientX - secondPointer.shiftX - dial.getBoundingClientRect().left;   
			} else if (slider.config.plane === 'vertical'){
				newLeftSecondP = dial.getBoundingClientRect().bottom - event.clientY - (secondPointer.offsetWidth - secondPointer.shiftX); 
			};

			if (newLeftSecondP > rightEdge) {
				newLeftSecondP = rightEdge;
			}; 
			
			if (newLeftSecondP < +firstPointer.style.left.slice(0, -2)){
				newLeftSecondP = +firstPointer.style.left.slice(0, -2);
			};

		secondPointer.style.left = newLeftSecondP + 'px';           
		slider.secondValue.innerHTML = Math.round((+slider.secondPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * slider.scale) + slider.config.min;
		slider.dialColor.style.width = +secondPointer.style.left.slice(0, -2) - +firstPointer.style.left.slice(0, -2) +'px';
		};  
}

function _error(slider){

	if (slider.config.quantityPointer != 2 && slider.config.quantityPointer != 1){
		alert('Ошибка: количество ползунков 1 или 2');
	};

	if (typeof(slider.config.startFP) != 'number' || typeof(slider.config.startSP) != 'number'){
		slider.title.innerHTML = 'Стартовое значение ползунка должно быть числом';
		slider.title.style.color = 'red';
	};

	if (typeof(slider.config.min) != 'number' || typeof(slider.config.max) != 'number'){	
		slider.title.innerHTML = 'Минимальное и максимальное значения слайдера должны быть числом';
		slider.title.style.color = 'red';	
	};
	
	if (slider.config.startFP < slider.config.min || slider.config.startFP > slider.config.max){		
		slider.config.startFP = slider.config.min;	
		alert("Значение ползунка не должно выходить за пределы min и max слайдера");		
	};

	if (slider.config.startSP > slider.config.max || slider.config.startSP < slider.config.min){
		slider.config.startSP = slider.config.max;
		alert("Значение ползунка не должно выходить за пределы min и max слайдера");			
	}; 


	if (slider.config.startFP > slider.config.startSP){		
		slider.config.startFP = slider.config.min;
		slider.config.startSP = slider.config.max;	
		alert("Значение первого ползунка не могут привышать значение второго");	
	};	
}

/*
  
	startFP: 10,
	startSP: 20,
	min: 0,
	max: 10, 
	

*/
export {Slider}; // экспортирует в тест страницу(пока она есть), потом убрать

