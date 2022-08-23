"use strict";



class Slider {

  constructor(elem){
    
    this.wrap = elem;

    this.title = document.createElement('div');
    this.title.className = 'slider-title';
    this.title.innerHTML = 'Range slider';
    this.wrap.append(this.title);

    this.dial = document.createElement('div');    
    this.wrap.append(this.dial);
    this.dial.className = 'slider-dial'; 

    this.firstPolzunok = document.createElement('div');
    this.firstPolzunok.className = 'slider-polzunok1';
    this.dial.append(this.firstPolzunok);
    this.firstPolzunok.style.left = '0';
    
    this.secondPolzunok = document.createElement('div');
    this.secondPolzunok.className = 'slider-polzunok2';
    this.dial.append(this.secondPolzunok); 
    this.secondPolzunok.style.left = '110px';
    
    this.firstValue = document.createElement('div');
    this.firstValue.className = 'slider-value1';
    this.firstValue.innerHTML = this.firstPolzunok.style.left.slice(0, -2);
    this.title.append(this.firstValue);
    
    this.secondValue = document.createElement('div');
    this.secondValue.className = 'slider-value2';
    this.secondValue.innerHTML = this.secondPolzunok.style.left.slice(0, -2);
    this.title.append(this.secondValue);      
    
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);   
        
  }

  init(){   

    this.firstPolzunok.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
    this.secondPolzunok.addEventListener('pointerdown', this.onPointerDown.bind(this), false);    
        
  }

  onPointerDown(event){   

    document.addEventListener('pointermove',  this.onPointerMove, false); 
    document.addEventListener('pointerup', this.onPointerUp, false); 
    
    let firstPolzunok = document.querySelector('.slider-polzunok1');
    let secondPolzunok = document.querySelector('.slider-polzunok2');

    if (event.currentTarget == firstPolzunok){  
      this.a = 5;    

      firstPolzunok.shiftX = event.clientX - firstPolzunok.getBoundingClientRect().left; 
     
    } else if (event.currentTarget == secondPolzunok){
      this.a = 6;

      secondPolzunok.shiftX = event.clientX - secondPolzunok.getBoundingClientRect().left;     
    }       
  }
 
  onPointerMove(event){   

    let dial = document.querySelector('.slider-dial');
    let firstPolzunok = document.querySelector('.slider-polzunok1');
    let secondPolzunok = document.querySelector('.slider-polzunok2');  
    
    
    if (this.a == 5){  

      let newLeftFirstP = event.clientX - firstPolzunok.shiftX - dial.getBoundingClientRect().left;

      if (newLeftFirstP < 0) {
        newLeftFirstP = 0;
      };

      if (newLeftFirstP > +secondPolzunok.style.left.slice(0, -2)){
        newLeftFirstP = +secondPolzunok.style.left.slice(0, -2);
      };

      firstPolzunok.style.left = newLeftFirstP + 'px';
      this.firstValue.innerHTML = Math.round(newLeftFirstP);

    } else if (this.a == 6){

      let newLeftSecondP = event.clientX - secondPolzunok.shiftX - dial.getBoundingClientRect().left;   

      let rightEdge = dial.offsetWidth - secondPolzunok.offsetWidth;

      if (newLeftSecondP > rightEdge) {
        newLeftSecondP = rightEdge;
      }; 
      
      if (newLeftSecondP < +firstPolzunok.style.left.slice(0, -2)){
        newLeftSecondP = +firstPolzunok.style.left.slice(0, -2);
      };

      secondPolzunok.style.left = newLeftSecondP + 'px';
      this.secondValue.innerHTML = Math.round(newLeftSecondP);
    };        
  }
  
  onPointerUp(){   

    document.removeEventListener('pointerup', this.onPointerUp); 
    document.removeEventListener('pointermove', this.onPointerMove);    

  }
}



const slider = new Slider(document.querySelector('.slider-wrap'));


slider.init();




