"use strict";

import {sayTest, sayTest2 } from './utils.js';





class Slider {
  
  title = document.createElement('div');
  dial = document.createElement('div'); 
  dialColor = document.createElement('div');  
  firstBtn = document.createElement('div');
  secondBtn = document.createElement('div');
  firstValue = document.createElement('div');
  secondValue = document.createElement('div');
  config = {
    value: 'visible',
    startFP: 0,
    startSP: 10,
    min: 0,
    max: 100, 
    plane: 'horizontal',
    quantityBtn: '2',    
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

    if(this.config.plane === 'vertical') {this.dial.classList.add('rotate');};       
      
    this.dial.append(this.dialColor);
    this.dialColor.className = 'slider-dial__color';  
    
    
    this.firstBtn.className = 'slider-Btn1';
    this.dial.append(this.firstBtn);

    if(this.config.quantityBtn === '2'){

      this.firstBtn.style.left = ((this.config.startFP - this.config.min) * (this.dial.offsetWidth - this.firstBtn.offsetWidth) / 10 / this.scale) + 'px'; 

    } else if (this.config.quantityBtn === '1'){

      this.firstBtn.style.display = 'none';
      this.firstBtn.style.width = 0;
    };

    this.secondBtn.className = 'slider-Btn2';
    this.dial.append(this.secondBtn); 
    this.secondBtn.style.left =  ((this.config.startSP - this.config.min) * (this.dial.offsetWidth - this.secondBtn.offsetWidth) / 10 / this.scale) + 'px';
    
    if (this.config.value === 'visible'){

      this.firstValue.className = 'slider-value1';
      this.firstValue.innerHTML = this.config.startFP;    
      this.firstBtn.append(this.firstValue);
      this.firstValue.style.display = this.firstBtn.style.display;
      this.firstValue.style.left = - 8 * this.firstValue.innerHTML.length;
      
      this.secondValue.className = 'slider-value2';
      this.secondValue.innerHTML = this.config.startSP ;
      this.secondBtn.append(this.secondValue); 
    };

    this.dialColor.style.left = +this.firstBtn.style.left.slice(0, -2) +'px';
    this.dialColor.style.width = +this.secondBtn.style.left.slice(0, -2) - +this.firstBtn.style.left.slice(0, -2) +'px'; 
   }

  init(){ 

    sayTest();  
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.firstBtn.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
    this.secondBtn.addEventListener('pointerdown', this.onPointerDown.bind(this), false); 

    this.dial.addEventListener('ff', this.ff.bind(this), false);    
        
  }

  ff(event){
    let dial = this.wrap.querySelector('.slider-dial');
    let firstBtn = this.wrap.querySelector('.slider-Btn1');
    let secondBtn = this.wrap.querySelector('.slider-Btn2');

    let dialSfiftX = event.clientX - dial.getBoundingClientRect().left;

    if ((dialSfiftX - firstBtn.style.left) ** 2 < (dialSfiftX - secondBtn.style.left) ** 2){
      console.log('first'); 
    } else if((dialSfiftX - firstBtn.style.left) ** 2 > (dialSfiftX - secondBtn.style.left) ** 2){
      console.log('second');  
    }
  }

  onPointerDown(event){  

    document.addEventListener('pointermove',  this.onPointerMove, false); 
    document.addEventListener('pointerup', this.onPointerUp, false);     
    
    let firstBtn = this.wrap.querySelector('.slider-Btn1');
    let secondBtn = this.wrap.querySelector('.slider-Btn2');


    ///условие: вертикальный или горизонтальный

    if(this.config.plane === 'horizontal') { 

      if (event.target === firstBtn){ 

        this.focus = 'first'; 
        firstBtn.style.zIndex = 2;
        secondBtn.style.zIndex = 1;
        firstBtn.shiftX = event.clientX - firstBtn.getBoundingClientRect().left; 
      
      } else if (event.target === secondBtn){

        this.focus = 'second'; 
        secondBtn.shiftX = event.clientX - secondBtn.getBoundingClientRect().left; 
        firstBtn.style.zIndex = 1;
        secondBtn.style.zIndex = 2;       
      };  

    } else if (this.config.plane === 'vertical'){

      if (event.target === firstBtn){ 

          this.focus = 'first';
          firstBtn.style.zIndex = 2;
          secondBtn.style.zIndex = 1;
          firstBtn.shiftX = event.clientY - firstBtn.getBoundingClientRect().top; 

      } else if (event.target === secondBtn){

          this.focus = 'second';
          firstBtn.style.zIndex = 1;
          secondBtn.style.zIndex = 2;
          secondBtn.shiftX = event.clientY - secondBtn.getBoundingClientRect().top;
      }; 
    };        
  }
 
  onPointerMove(event){   

    let dial = this.wrap.querySelector('.slider-dial');
    let firstBtn = this.wrap.querySelector('.slider-Btn1');
    let secondBtn = this.wrap.querySelector('.slider-Btn2');  
    let rightEdge = dial.offsetWidth - secondBtn.offsetWidth;  
    let newLeftFirstP;
    let newLeftSecondP;

    if (this.focus === 'first'){ 

      if (this.config.plane === 'horizontal'){

        newLeftFirstP = event.clientX - firstBtn.shiftX - dial.getBoundingClientRect().left;

      } else if (this.config.plane === 'vertical'){
        newLeftFirstP =  dial.getBoundingClientRect().bottom - event.clientY - (firstBtn.offsetWidth - firstBtn.shiftX); //!!!!!!!!!!!!!!  
      }

      if (newLeftFirstP < 0) {
        newLeftFirstP = 0;
      };

      if (newLeftFirstP >= +secondBtn.style.left.slice(0, -2)){
        newLeftFirstP = +secondBtn.style.left.slice(0, -2);
      };

      firstBtn.style.left = newLeftFirstP + 'px';
      this.firstValue.innerHTML = Math.round((+firstBtn.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale) + this.config.min;
      this.firstValue.style.left = - 8 * this.firstValue.innerHTML.length; //что-бы не накладывались друг на друга
      
      this.dialColor.style.left = newLeftFirstP + 'px';
      this.dialColor.style.width = +secondBtn.style.left.slice(0, -2) - +firstBtn.style.left.slice(0, -2) +'px';

    } else if (this.focus === 'second'){

        if (this.config.plane === 'horizontal'){
          newLeftSecondP = event.clientX - secondBtn.shiftX - dial.getBoundingClientRect().left;   
        } else if (this.config.plane === 'vertical'){
          newLeftSecondP = dial.getBoundingClientRect().bottom - event.clientY - (secondBtn.offsetWidth - secondBtn.shiftX); 
        };

        if (newLeftSecondP > rightEdge) {
          newLeftSecondP = rightEdge;
        }; 
        
        if (newLeftSecondP < +firstBtn.style.left.slice(0, -2)){
          newLeftSecondP = +firstBtn.style.left.slice(0, -2);
        };

      secondBtn.style.left = newLeftSecondP + 'px';           
      this.secondValue.innerHTML = Math.round((+this.secondBtn.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale) + this.config.min;
      this.dialColor.style.width = +secondBtn.style.left.slice(0, -2) - +firstBtn.style.left.slice(0, -2) +'px';
    };        
  }
  
  onPointerUp(){   

    document.removeEventListener('pointerup', this.onPointerUp); 
    document.removeEventListener('pointermove', this.onPointerMove);    

  }
}


export {Slider};

