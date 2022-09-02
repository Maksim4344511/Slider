"use strict";

function sayTest() {
    console.log('test');
}

//// объявить функции....

function createMenu(slider){

    slider.sliderConfig = document.createElement('form');
    slider.wrap.append(slider.sliderConfig);
    slider.sliderConfig.className = 'slider-config';
    
    slider.select = document.createElement('select');
    slider.sliderConfig.append(slider.select);
    
    
    slider.optionTitle = new Option("Количество ползунков", "5");    
    slider.select.append(slider.optionTitle);
    slider.optionTitle.disabled  = 'true';

    slider.option1 = new Option("1", "1");    
    slider.select.append(slider.option1);
    slider.option2 = new Option("2", "2");
    slider.select.append(slider.option2);

    slider.btn = document.createElement('input');
    slider.btn.type = 'submit';
    slider.btn.value = 'Сохранить';    
    slider.sliderConfig.append(slider.btn);  
    
}

export {createMenu};

