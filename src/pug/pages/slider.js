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
    
    this.onpointermove = this.onpointermove.bind(this);
    this.pointerup = this.pointerup.bind(this);
   
        
  }

  init(){       
    this.firstPolzunok.addEventListener('pointerdown', this.onpointerdown.bind(this), false);         
  }

  onpointerdown(event){   
    document.addEventListener('pointermove',  this.move, false); 
    document.addEventListener('pointerup', this.pointerup, false); 
    
    let x = document.querySelector('.slider-polzunok1');

    let shiftX = event.clientX - x.getBoundingClientRect().left;
    x.classList.add('shift');
    x.shift = shiftX;
     
  }

 
  onpointermove(event){    

    let x = document.querySelector('.slider-polzunok1');
    let y = document.querySelector('.slider-dial');    

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
  
  pointerup(){     
    document.removeEventListener('pointerup', this.pointerup); 
    document.removeEventListener('pointermove', this.onpointermove);    

  }
}



const slider = new Slider(document.querySelector('.slider-wrap'));

slider.init();
//console.log(slider);



