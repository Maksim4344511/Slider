"use strict";

import {sayTest, sayTest2 } from './utils.js';

class Slider {
  
  title = document.createElement('div');
  dial = document.createElement('div'); 
  dialColor = document.createElement('div');  
  firstPointer = document.createElement('div');
  secondPointer = document.createElement('div');
  firstValue = document.createElement('div');
  secondValue = document.createElement('div');
  sliderConfig = document.createElement('div');
  config = {
    value: 'visible',
    startFP: 10,
    startSP: 20,
    min: 0,
    max: 10, 
    plane: 'horizontal',
    quantityPointer: '2',    
  };  

  constructor(elem, options){

    this.wrap = elem;    

    this.config = Object.assign(this.config, options);
    this.scale = (this.config.max - this.config.min) / 10;   

    this.title.className = 'slider-title';
    this.title.innerHTML = 'Range slider';
    this.wrap.append(this.title);
    
    this.wrap.append(this.dial);
    this.dial.className = 'slider-dial';

    if(this.config.plane === 'vertical') {

      this.dial.classList.add('rotate');
    };       
      
    this.dial.append(this.dialColor);
    this.dialColor.className = 'slider-dial__color';  
    
    
    this.firstPointer.className = 'slider-Pointer1';
    this.dial.append(this.firstPointer);

    if(this.config.quantityPointer === '2'){

      this.firstPointer.style.left = ((this.config.startFP - this.config.min) * (this.dial.offsetWidth - this.firstPointer.offsetWidth) / 10 / this.scale) + 'px'; 

    } else if (this.config.quantityPointer === '1'){

      this.firstPointer.style.display = 'none';
      this.firstPointer.style.width = 0;
    };

    this.secondPointer.className = 'slider-Pointer2';
    this.dial.append(this.secondPointer); 
    this.secondPointer.style.left =  ((this.config.startSP - this.config.min) * (this.dial.offsetWidth - this.secondPointer.offsetWidth) / 10 / this.scale) + 'px';
    
    if (this.config.value === 'visible'){

      this.firstValue.className = 'slider-value1';
      this.firstValue.innerHTML = this.config.startFP;    
      this.firstPointer.append(this.firstValue);
      this.firstValue.style.display = this.firstPointer.style.display;
      this.firstValue.style.left = - 4 * this.firstValue.innerHTML.length;
      
      this.secondValue.className = 'slider-value2';
      this.secondValue.innerHTML = this.config.startSP ;
      this.secondPointer.append(this.secondValue); 
    };

    this.dialColor.style.left = +this.firstPointer.style.left.slice(0, -2) +'px';
    this.dialColor.style.width = +this.secondPointer.style.left.slice(0, -2) - +this.firstPointer.style.left.slice(0, -2) +'px'; 

    //menu
    this.wrap.append(this.sliderConfig);
    this.sliderConfig.className = 'slider-config';
    
    this.titleConfig = document.createElement('div');
    this.sliderConfig.append(this.titleConfig);
    this.titleConfig.className = 'configTitle';

    this.configValue = document.createElement('input');
    this.sliderConfig.append(this.configValue);
    this.configValue.className = 'configValue';  
    this.configValue.placeholder="введите сообщение";
   

    this.configStartFP = document.createElement('input'); 

    this.configStartSP = document.createElement('input'); 

    this.configMin= document.createElement('input');   

    this.configMax = document.createElement('input'); 

    this.configPlane = document.createElement('input');
    
    this.configQuantityPointer = document.createElement('input');  

    
    this.wrap.append(this.sliderConfig);
/*
    value: 'visible',
    startFP: 10,
    startSP: 20,
    min: 0,
    max: 10, 
    plane: 'horizontal',
    quantityPointer: '2', 
*/
   }

  init(){ 
    
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.firstPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
    this.secondPointer.addEventListener('pointerdown', this.onPointerDown.bind(this), false);   

    this.dial.addEventListener('pointerdown', this.onDialDown.bind(this), false);  
  }

  
  onDialDown(event){ // клик по шкале    

    let dial = this.wrap.querySelector('.slider-dial');
    let firstPointer = this.wrap.querySelector('.slider-Pointer1');
    let secondPointer = this.wrap.querySelector('.slider-Pointer2');
    let dialSfiftX;
    
     if (event.target === dial || event.target ===this.dialColor){

      
      let rightEdge = dial.offsetWidth - secondPointer.offsetWidth;

      if(this.config.plane === 'horizontal'){
       
        dialSfiftX = event.clientX - firstPointer.offsetWidth / 2 - dial.getBoundingClientRect().left;

        if ((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){

          if (dialSfiftX - firstPointer.offsetWidth < 0) {
  
            dialSfiftX = 0;
          }; 
  
          this.firstPointer.style.left = dialSfiftX + 'px';
  
        } else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 > (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){
  
          if (dialSfiftX > rightEdge) {
  
            dialSfiftX = rightEdge;        
          }; 
        this.secondPointer.style.left = dialSfiftX + 'px';  
        };


    } else if (this.config.plane === 'vertical'){

        dialSfiftX = dial.getBoundingClientRect().bottom - event.clientY - firstPointer.offsetWidth / 2;
        
        if ((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 < (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){

          if (dialSfiftX - firstPointer.offsetWidth < 0) {
  
            dialSfiftX = 0;
          }; 
  
          this.firstPointer.style.left = dialSfiftX + 'px';
  
        } else if((dialSfiftX - +firstPointer.style.left.slice(0, -2)) ** 2 > (dialSfiftX - +secondPointer.style.left.slice(0, -2)) ** 2){
  
          if (dialSfiftX > rightEdge) {
  
            dialSfiftX = rightEdge;        
          }; 
        this.secondPointer.style.left = dialSfiftX + 'px';  
        };
      };

      this.dialColor.style.left = +this.firstPointer.style.left.slice(0, -2) +'px';
      this.dialColor.style.width = +this.secondPointer.style.left.slice(0, -2) - +this.firstPointer.style.left.slice(0, -2) +'px';

      this.firstValue.innerHTML = Math.round((+firstPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale) + this.config.min;
      this.firstValue.style.left = - 7 * this.firstValue.innerHTML.length;
      this.secondValue.innerHTML = Math.round((+this.secondPointer.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale) + this.config.min;
    };
  }


onPointerDown(event){  

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

onPointerMove(event){   

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
  
  onPointerUp(){   

    document.removeEventListener('pointerup', this.onPointerUp); 
    document.removeEventListener('pointermove', this.onPointerMove);    

  }
}


export {Slider};

