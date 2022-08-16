"use strict";

class Slider {
  constructor(name){
    this.name = name;
  }

  createPolzunokHTML(){

    let wrap = document.body.firstChild;

    let dial = document.createElement('div');
    dial.className = 'slider-dial';
    wrap.append(dial);

    let firstPolzunok = document.createElement('div');
    firstPolzunok.className = 'slider-polzunok1';
    dial.append(firstPolzunok); 
   
  }

  moveFirstPolzunok(){

    //let useX = event.clientX - firstPolzunok.getBoundingClientRect().left;
    console.log(document.querySelector('.slider-dial'));
    console.log('sdf');
    /*
  firstPolzunok.onmousedown = function(event) {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)????? первый


    

    document.addEventListener('mousemove', onMouseMove); // двигаем мышку
    document.addEventListener('mouseup', onMouseUp); //отпустил мышку

    function onMouseMove(event) {
        let moveLeft = event.clientX - useX - dial.getBoundingClientRect().left ;

        if (moveLeft < 0) {
            moveLeft = 0;
          }
          let rightEdge = dial.offsetWidth - firstPolzunok.offsetWidth;
          if (moveLeft > rightEdge) {
            moveLeft = rightEdge;
          }
  
          firstPolzunok.style.left = moveLeft + 'px';
        }


    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp); 
        document.removeEventListener('mousemove', onMouseMove);
      }//  отключаем обработчики
}


firstPolzunok.ondragstart = function() {
    return false;    
};///  и опять предотвращаем выделение документа. Пока оставляю оба.*/
  }


};


let test = new Slider();

test.createPolzunokHTML();

test.moveFirstPolzunok();