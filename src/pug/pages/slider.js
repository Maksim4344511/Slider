"use strict";

import {_render, _onDialDown} from './utils.js';
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
    
    if(this.config.showOptions === 'true'){
      this.quantityPointers.addEventListener('change', this.onChange.bind(this), false);  
      this.btnSave.addEventListener('click', this.onClick.bind(this), false);     
    };
   
   
  }

  onChange(){ 
    _onChange(this);   // выбор количество ползунков в шоу-меню
  }

  onClick(event){    // сохраняет настройки в шоу меню
    event.preventDefault(); 
    this.dialColor.style.backgroundColor= 'red'; 
    this.config.plane = 'vertical' ;
    
  }
  



  onDialDown(event){ // клик по шкале передвигает ближайший ползунок   
    _onDialDown(this, event)    
  }


onPointerDown(event){  //фиксирует таргет на зажжатом ползунке

  document.addEventListener('pointermove',  this.onPointerMove, false); 
  document.addEventListener('pointerup', this.onPointerUp, false);     
  
  let firstPointer = this.wrap.querySelector('.slider-Pointer1');
  let secondPointer = this.wrap.querySelector('.slider-Pointer2');
  
  if(this.config.plane === 'horizontal') { 

    if (event.target === firstPointer){ 

      this.focus = 'first';        
      firstPointer.style.zIndex = 2;
      secondPointer.style.zIndex = 1;
      firstPointer.shiftX = event.clientX - firstPointer.getBoundingClientRect().left; 
    
    } else if (event.target === secondPointer){

      this.focus = 'second'; 
      secondPointer.shiftX = event.clientX - secondPointer.getBoundingClientRect().left; 
      firstPointer.style.zIndex = 1;
      secondPointer.style.zIndex = 2;       
    };  

  } else if (this.config.plane === 'vertical'){

    if (event.target === firstPointer){ 

        this.focus = 'first';
        firstPointer.style.zIndex = 2;
        secondPointer.style.zIndex = 1;
        firstPointer.shiftX = event.clientY - firstPointer.getBoundingClientRect().top; 

    } else if (event.target === secondPointer){

        this.focus = 'second';
        firstPointer.style.zIndex = 1;
        secondPointer.style.zIndex = 2;
        secondPointer.shiftX = event.clientY - secondPointer.getBoundingClientRect().top;
      }; 
    };        
  }

onPointerMove(event){   // передвигает зажатый ползунок

  let dial = this.wrap.querySelector('.slider-dial');
  let firstPointer = this.wrap.querySelector('.slider-Pointer1');
  let secondPointer = this.wrap.querySelector('.slider-Pointer2');  
  let rightEdge = dial.offsetWidth - secondPointer.offsetWidth;  
  let newLeftFirstP;
  let newLeftSecondP;

  if (this.focus === 'first'){ 

    if (this.config.plane === 'horizontal'){

      newLeftFirstP = event.clientX - firstPointer.shiftX - dial.getBoundingClientRect().left;

    } else if (this.config.plane === 'vertical'){
      newLeftFirstP =  dial.getBoundingClientRect().bottom - event.clientY - (firstPointer.offsetWidth - firstPointer.shiftX); 
    }

    if (newLeftFirstP < 0) {
      newLeftFirstP = 0;
    };

    if (newLeftFirstP >= +secondPointer.style.left.slice(0, -2)){
      newLeftFirstP = +secondPointer.style.left.slice(0, -2);
    };

    firstPointer.style.left = newLeftFirstP + 'px';
    this.firstValue.innerHTML = Math.round((+firstPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale) + this.config.min;
    this.firstValue.style.left = - 7 * this.firstValue.innerHTML.length; //что-бы не накладывались друг на друга
    
    this.dialColor.style.left = newLeftFirstP + 'px';
    this.dialColor.style.width = +secondPointer.style.left.slice(0, -2) - +firstPointer.style.left.slice(0, -2) +'px';

  } else if (this.focus === 'second'){

      if (this.config.plane === 'horizontal'){
        newLeftSecondP = event.clientX - secondPointer.shiftX - dial.getBoundingClientRect().left;   
      } else if (this.config.plane === 'vertical'){
        newLeftSecondP = dial.getBoundingClientRect().bottom - event.clientY - (secondPointer.offsetWidth - secondPointer.shiftX); 
      };

      if (newLeftSecondP > rightEdge) {
        newLeftSecondP = rightEdge;
      }; 
      
      if (newLeftSecondP < +firstPointer.style.left.slice(0, -2)){
        newLeftSecondP = +firstPointer.style.left.slice(0, -2);
      };

    secondPointer.style.left = newLeftSecondP + 'px';           
    this.secondValue.innerHTML = Math.round((+this.secondPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale) + this.config.min;
    this.dialColor.style.width = +secondPointer.style.left.slice(0, -2) - +firstPointer.style.left.slice(0, -2) +'px';
    };        
  }
  
  onPointerUp(){    //отменяет зажатие и передвижиние ползунка

    document.removeEventListener('pointerup', this.onPointerUp); 
    document.removeEventListener('pointermove', this.onPointerMove);    

  }
}


export {Slider}; // экспортирует в тест страницу(пока она есть), потом убрать

