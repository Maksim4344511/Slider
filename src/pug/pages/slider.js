"use strict";



class Slider {

  constructor(elem){
    
    this.wrap = elem;
    this.dial = document.createElement('div');    
    this.wrap.append(this.dial);
    this.dial.className = 'slider-dial';
    this.firstPolzunok = document.createElement('div');
    this.firstPolzunok.className = 'slider-polzunok1';
    this.dial.append(this.firstPolzunok);     
        
  }

  init(){       
    document.addEventListener('mousedown', this.start);
    document.addEventListener('mousemove', this.move); // переделать, что бы двигался при нажатии на ползунок.??????
    document.addEventListener('mouseup', this.onMouseUp);
    
  }

  start(event){     
    let x = this.querySelector('.slider-polzunok1');
    
    let shiftX = event.clientX - x.getBoundingClientRect().left;
    x.classList.add('shift');
    x.shift = shiftX;
  }

  move(event){
    let x = this.querySelector('.slider-polzunok1');
    let y = this.querySelector('.slider-dial');    

    let newLeft = event.clientX - x.shift - y.getBoundingClientRect().left;

    if (newLeft < 0) {
      newLeft = 0;
    }

    let rightEdge = y.offsetWidth - x.offsetWidth;

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    x.style.left = newLeft + 'px';    
  }   
 

  onMouseUp(){ 
    document.removeEventListener('mouseup', this.onMouseUp);  //не могу отменить??????
    document.removeEventListener('mousemove', this.move);    //не могу отменить???????
  }
 
  
}



let slider = new Slider(document.querySelector('.slider-wrap'));

slider.init();
console.log(slider);

