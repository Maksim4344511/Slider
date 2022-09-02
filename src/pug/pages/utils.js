"use strict";



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
	
	slider.wrap.append(slider.dial);
	slider.dial.className = 'slider-dial';

	if(slider.config.plane === 'vertical') {

		slider.dial.classList.add('rotate');
	};       
		
	slider.dial.append(slider.dialColor);
	slider.dialColor.className = 'slider-dial__color';  
	
	
	slider.firstPointer.className = 'slider-Pointer1';
	slider.dial.append(slider.firstPointer);

	if(slider.config.quantityPointer === '2'){

		slider.firstPointer.style.left = ((slider.config.startFP - slider.config.min) * (slider.dial.offsetWidth - slider.firstPointer.offsetWidth) / 10 / slider.scale) + 'px'; 

	} else if (slider.config.quantityPointer === '1'){

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

	if (slider.config.quantityPointer === '2'){

		slider.dialColor.style.left = +slider.firstPointer.style.left.slice(0, -2) +'px';
		slider.dialColor.style.width = +slider.secondPointer.style.left.slice(0, -2) - +slider.firstPointer.style.left.slice(0, -2) +'px';

	}else if (slider.config.quantityPointer === '1'){

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

			if ((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === '2'){

				if (dialSfiftX - firstPointer.offsetWidth < 0) {

					dialSfiftX = 0;
				}; 

				slider.firstPointer.style.left = dialSfiftX + 'px';

			} else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 > (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){

					if (dialSfiftX > rightEdge ) {

						dialSfiftX = rightEdge;        
					}; 
				slider.secondPointer.style.left = dialSfiftX + 'px';  

			} else if (((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === '1')){
				
				if (dialSfiftX > rightEdge ) {

					dialSfiftX = rightEdge;        
				}; 
				slider.secondPointer.style.left = dialSfiftX + 'px'; 
				slider.firstPointer.style.left = 0;
			};


	} else if (slider.config.plane === 'vertical'){

			dialSfiftX = dial.getBoundingClientRect().bottom - event.clientY - firstPointer.offsetWidth / 2;
			
			if ((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === '2'){

				if (dialSfiftX - firstPointer.offsetWidth < 0) {

					dialSfiftX = 0;
				}; 

				slider.firstPointer.style.left = dialSfiftX + 'px';

			} else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 > (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){

				if (dialSfiftX > rightEdge) {

					dialSfiftX = rightEdge;        
				}; 

			slider.secondPointer.style.left = dialSfiftX + 'px'; 

			} else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2 && slider.config.quantityPointer === '1'){
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

	






export {_render, _onDialDown};

