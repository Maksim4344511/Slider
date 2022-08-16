"use strict";

let firstPolzunok = document.querySelector('.slider-polzunok1');
let dial = document.querySelector('.slider-dial');

firstPolzunok.onmousedown = function(event) {
    event.preventDefault(); // предотвратить запуск выделения (действие браузера)????? первый


    let useX = event.clientX  - firstPolzunok.getBoundingClientRect().left;//я бы оставил event.clientX, но ползунок дергается

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
};///  и опять предотвращаем выделение документа. Пока оставляю оба.
