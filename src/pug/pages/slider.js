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

  createPolzunokHTML(){  }


  moveFirstPolzunok(){

    let y = this.firstPolzunok;
    let s = this.dial;

    y.onmousedown = function(event){
      
    let shiftX = event.clientX - y.getBoundingClientRect().left;       
   
    console.log(event.clientX);

    s.addEventListener('mousemove', onMouseMove); // двигаем мышку
    s.addEventListener('mouseup', onMouseUp); //отпустил мышку

    function onMouseMove(event) {
      let newLeft = event.clientX - shiftX - s.getBoundingClientRect().left;
      console.log(newLeft);

      // курсор вышел из слайдера => оставить бегунок в его границах.
      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = s.offsetWidth - y.offsetWidth;      
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

     y.style.left =  newLeft + 'px';
    }


    function onMouseUp() {
      s.removeEventListener('mouseup', onMouseUp);
      s.removeEventListener('mousemove', onMouseMove);
      }
    }  
  }

  ff() {
    let y = this.firstPolzunok;
    y.ondragstart = function() {
      return false;
    };
  };
}





let test = new Slider(document.querySelector('.slider-wrap'));



test.moveFirstPolzunok();

