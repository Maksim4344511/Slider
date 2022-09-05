"use strict";

/*
function _createMenu(slider){//создание меню

	slider.sliderMenu = document.createElement('div');
	slider.dial.append(slider.sliderMenu);
	slider.sliderMenu.className = 'slider-menu';	
	
	//выбор количества ползунков
	slider.quantityPointers = document.createElement('select');
	slider.sliderMenu.append(slider.quantityPointers);	
	
	slider.quantityPointersTitle = new Option("Количество ползунков?", "5");    
	slider.quantityPointers.append(slider.quantityPointersTitle);
	slider.quantityPointersTitle.disabled  = 'true';

	slider.optionPointer1 = new Option("1", "1");    
	slider.quantityPointers.append(slider.optionPointer1);
	slider.optionPointer2 = new Option("2", "2");
	slider.quantityPointers.append(slider.optionPointer2);


//выбор плоскости
	slider.plane = document.createElement('select');
	slider.sliderMenu.append(slider.plane);	
	
	slider.planeTitle = new Option("Плоскость?", "6");    
	slider.plane.append(slider.planeTitle);
	slider.planeTitle.disabled  = 'true';

	slider.optionPlane1 = new Option("Горизонтальная", "horizontal");    
	slider.plane.append(slider.optionPlane1);
	slider.optionPlane2 = new Option("Вертикальная", "vertical");
	slider.plane.append(slider.optionPlane2);

//элемент над ползунком
	slider.indicator = document.createElement('select');
	slider.sliderMenu.append(slider.indicator);	
	
	slider.indicatorTitle = new Option("Индикатор?", "7");    
	slider.indicator.append(slider.indicatorTitle);
	slider.indicatorTitle.disabled  = 'true';

	slider.indicator1 = new Option("Нужен", "visible");    
	slider.indicator.append(slider.indicator1);
	slider.indicator2 = new Option("Не нужен", "");
	slider.indicator.append(slider.indicator2);

	

	slider.sliderConfigForm = document.createElement('form');
	slider.sliderMenu.append(slider.sliderConfigForm);
	slider.sliderConfigForm.className = 'slider-config-save';

	slider.inputStartFP = document.createElement('input');
	slider.inputStartFP.type = 'text';
	slider.inputStartFP.value = 'Значение первого ползунка';    
	slider.sliderConfigForm.append(slider.inputStartFP); 

	slider.inputStartSP = document.createElement('input');
	slider.inputStartSP.type = 'text';
	slider.inputStartSP.value = 'Значение второго ползунка';    
	slider.sliderConfigForm.append(slider.inputStartSP); 

	slider.inputMin = document.createElement('input');
	slider.inputMin.type = 'text';
	slider.inputMin.value = 'Мин значение';    
	slider.sliderConfigForm.append(slider.inputMin); 

	slider.inputMax = document.createElement('input');
	slider.inputMax.type = 'text';
	slider.inputMax.value = 'Макс значение';    
	slider.sliderConfigForm.append(slider.inputMax); 

	slider.btnSave = document.createElement('input');
	slider.btnSave.type = 'submit';
	slider.btnSave.value = 'Сохранить';    
	slider.sliderConfigForm.append(slider.btnSave);  
    
  _moveMenu(slider);
}


function _onChange(slider){ // работает не правильно !!!!!!!!!!
			
	if(slider.quantityPointers.value === '2'){

		slider.firstPointer.style.left = ((slider.config.startFP - slider.config.min) * (slider.dial.offsetWidth - slider.firstPointer.offsetWidth) / 10 / slider.scale) + 'px'; 
		slider.firstPointer.style.display = 'block';
		slider.dialColor.style.left = +slider.firstPointer.style.left.slice(0, -2) +'px';
		slider.dialColor.style.width = +slider.secondPointer.style.left.slice(0, -2) - +slider.firstPointer.style.left.slice(0, -2) +'px'; 
		slider.firstValue.innerHTML = Math.round((+slider.firstPointer.style.left.slice(0, -2) / (slider.dial.offsetWidth - slider.secondPointer.offsetWidth)) * 10 * slider.scale) + slider.config.min;
		slider.firstValue.style.left = - 7 * slider.firstValue.innerHTML.length;		

	} else if (slider.quantityPointers.value === '1'){

		slider.firstPointer.style.display = 'none';
		slider.firstPointer.style.left = 0;
		slider.dialColor.style.left = 0;
		slider.dialColor.style.width = +slider.secondPointer.style.left.slice(0, -2); 
	};   

	if(slider.indicator.value === 'visible'){

		slider.firstValue.style.display = '';		
		slider.secondValue.style.display = '';		
		
	} else if (slider.indicator.value === ''){	
		
		slider.firstValue.style.display = 'none';		
		slider.secondValue.style.display = 'none';		
	};
	
}

function _moveMenu (slider){

	slider.sliderMenu.onmousedown = function(event) {

		let shiftX = event.clientX - slider.sliderMenu.getBoundingClientRect().left + 128; //переделать
		let shiftY = event.clientY - slider.sliderMenu.getBoundingClientRect().top + 89.9; //переделать 

		slider.sliderMenu.style.position = 'absolute';
		slider.sliderMenu.style.zIndex = 1000;
		

		moveAt(event.pageX, event.pageY);
		
		function moveAt(pageX, pageY) {
			slider.sliderMenu.style.left = pageX - shiftX + 'px';
			slider.sliderMenu.style.top = pageY - shiftY + 'px';
		};
		
		function onMouseMove(event) {
			moveAt(event.pageX, event.pageY);
		};

		slider.sliderMenu.addEventListener('mousemove', onMouseMove);	
		slider.sliderMenu.onmouseup = function() {
			slider.sliderMenu.removeEventListener('mousemove', onMouseMove);	
		};		
	};

	slider.sliderMenu.ondragstart = function() {
		return false;
  };
}





*/



