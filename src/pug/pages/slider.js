"use strict";

import {_render, _onDialDown, _onPointerDown, _onPointerMove} from './utils.js';
import {_createMenu, _onChange} from './slider-menu.js';

class Slider {  
  config = {
    indicator: 'visible',
    startFP: 10,
    startSP: 20,
    min: 0,
    max: 10, 
    plane: 'horizontal',
    quantityPointer: '2',   
    showOptions: 'false',
  }; 

  constructor(elem, options){   
   _render(this, elem, options) //создает HTML слайдера   
   
    if(this.config.showOptions === 'true'){ // вызывает шоу-меню    
      _createMenu(this);
    }; 
  }

  init(){ 
    
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.firstPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
    this.secondPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);   
    
    this.dial.addEventListener('pointerdown', this.onDialDown.bind(this), false);  
    
    if(this.config.showOptions === 'true'){// панель опций
      this.quantityPointers.addEventListener('change', this.onChange.bind(this), false);  
      this.btnSave.addEventListener('click', this.onClick.bind(this), false);     
    };   
  }

  onChange(){ 
    _onChange(this);   // выбор количество ползунков в шоу-меню   
   /*
    this.title.remove();
    this.dial.remove();
    _render(this, this.wrap, this.options);
    this.init();
    _createMenu(this);
   */
  }

  onClick(event){    // сохраняет настройки в шоу меню
    event.preventDefault(); 
    this.dialColor.style.backgroundColor= 'red';        
  }
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


export {Slider}; // экспортирует в тест страницу(пока она есть), потом убрать

