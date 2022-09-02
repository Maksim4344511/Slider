/*

class SliderVertical {
  
    title = document.createElement('div');
    dial = document.createElement('div'); 
    dialColor = document.createElement('div');  
    firstPolzunok = document.createElement('div');
    secondPolzunok = document.createElement('div');
    firstValue = document.createElement('div');
    secondValue = document.createElement('div');
    config = {
      startFP: 10,
      startSP: 210,
      max: 1200, 
      plane: 'vertical',    
    };
    
  
    constructor(elem, options){
  
      this.wrap = elem;     
  
      this.config = Object.assign(this.config, options);
      this.scale = (this.config.max / 10);
  
      this.title.className = 'slider-title';
      this.title.innerHTML = 'Range slider';
      this.wrap.append(this.title);
      
      this.wrap.append(this.dial);
      this.dial.className = 'slider-dial'; 
      if(this.config.plane === 'vertical') { //!!!!!!!!!!!!!
        this.dial.classList.add('rotate')  
      };     
        
      this.dial.append(this.dialColor);
      this.dialColor.className = 'slider-dial__color';  
     
      this.firstPolzunok.className = 'slider-polzunok1';
      this.dial.append(this.firstPolzunok);
      this.firstPolzunok.style.left = (this.config.startFP * (this.dial.offsetWidth - this.firstPolzunok.offsetWidth) / 10 / this.scale) + 'px'; 
      this.secondPolzunok.className = 'slider-polzunok2';
      this.dial.append(this.secondPolzunok); 
      this.secondPolzunok.style.left =  (this.config.startSP * (this.dial.offsetWidth - this.secondPolzunok.offsetWidth) / 10 / this.scale) + 'px';
            
      this.firstValue.className = 'slider-value1';
      this.firstValue.innerHTML = this.config.startFP;
      this.title.append(this.firstValue);
      
      this.secondValue.className = 'slider-value2';
      this.secondValue.innerHTML = ` - ${this.config.startSP}`;
      this.title.append(this.secondValue);        
  
      this.dialColor.style.left = +this.firstPolzunok.style.left.slice(0, -2) +'px';
      this.dialColor.style.width = +this.secondPolzunok.style.left.slice(0, -2) - +this.firstPolzunok.style.left.slice(0, -2) +'px';
  
      this.onPointerMove = this.onPointerMove.bind(this);
      this.onPointerUp = this.onPointerUp.bind(this);}
  
    init(){   
  
      this.firstPolzunok.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
      this.secondPolzunok.addEventListener('pointerdown', this.onPointerDown.bind(this), false);    
          
    }
  
    onPointerDown(event){   
          
      document.addEventListener('pointermove',  this.onPointerMove, false); 
      document.addEventListener('pointerup', this.onPointerUp, false); 
      
      let firstPolzunok = this.wrap.querySelector('.slider-polzunok1');
      let secondPolzunok = this.wrap.querySelector('.slider-polzunok2');
  
      if (event.target === firstPolzunok){  
        this.focus = 'first';  
        firstPolzunok.shiftX = event.clientY - firstPolzunok.getBoundingClientRect().top; // !!!!!!!!!!!!!
       
      } else if (event.target === secondPolzunok){
        this.focus = 'second'; 
        secondPolzunok.shiftX = event.clientY - secondPolzunok.getBoundingClientRect().top; //!!!!!!! !!!!!!!   
      }       
    }
   
    onPointerMove(event){   
        
  
      let dial = this.wrap.querySelector('.slider-dial');
      let firstPolzunok = this.wrap.querySelector('.slider-polzunok1');
      let secondPolzunok = this.wrap.querySelector('.slider-polzunok2');  
      let rightEdge = dial.offsetWidth - secondPolzunok.offsetWidth;  
     
      if (this.focus === 'first'){      
  
        let newLeftFirstP =  dial.getBoundingClientRect().bottom - event.clientY - (firstPolzunok.offsetWidth - firstPolzunok.shiftX); //!!!!!!!!!!!!!!

        if (newLeftFirstP < 0) {
          newLeftFirstP = 0;
        };
  
        if (newLeftFirstP > +secondPolzunok.style.left.slice(0, -2)){
          newLeftFirstP = +secondPolzunok.style.left.slice(0, -2);
        };
  
        firstPolzunok.style.left = newLeftFirstP + 'px';
        this.firstValue.innerHTML = Math.round((+this.firstPolzunok.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale); 
        
        this.dialColor.style.left = newLeftFirstP + 'px';
        this.dialColor.style.width = +secondPolzunok.style.left.slice(0, -2) - +firstPolzunok.style.left.slice(0, -2) +'px';
  
      } else if  (this.focus === 'second'){
  
        let newLeftSecondP = dial.getBoundingClientRect().bottom - event.clientY - (secondPolzunok.offsetWidth - secondPolzunok.shiftX);   // !!!!!!!!
  
        
  
        if (newLeftSecondP > rightEdge) {
          newLeftSecondP = rightEdge;
        }; 
        
        if (newLeftSecondP < +firstPolzunok.style.left.slice(0, -2)){
          newLeftSecondP = +firstPolzunok.style.left.slice(0, -2);
        };
  
        secondPolzunok.style.left = newLeftSecondP + 'px';     
        this.secondValue.innerHTML = ` - ${Math.round((+this.secondPolzunok.style.left.slice(0, -2) / (rightEdge)) * 10 * this.scale)}`;
        this.dialColor.style.width = +secondPolzunok.style.left.slice(0, -2) - +firstPolzunok.style.left.slice(0, -2) +'px';
      };        
    }
    
    onPointerUp(){   
  
      document.removeEventListener('pointerup', this.onPointerUp); 
      document.removeEventListener('pointermove', this.onPointerMove);    
  
    }
  }
  
 
  
  
  
  
  export {SliderVertical};
  */








  /*this.wrap = elem;      

    this.config = Object.assign(this.config, options);  

    this.title = document.createElement('div');
    this.dial = document.createElement('div'); 
    this.dialColor = document.createElement('div');  
    this.firstPointer = document.createElement('div');
    this.secondPointer = document.createElement('div');
    this.firstValue = document.createElement('div');
    this.secondValue = document.createElement('div'); 
    
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
      this.firstPointer.style.left = 0; 
    };

    this.secondPointer.className = 'slider-Pointer2';
    this.dial.append(this.secondPointer); 
    this.secondPointer.style.left =  ((this.config.startSP - this.config.min) * (this.dial.offsetWidth - this.secondPointer.offsetWidth) / 10 / this.scale) + 'px';
    
    if (this.config.value === 'visible'){

      this.firstValue.className = 'slider-value1';
      this.firstValue.innerHTML = this.config.startFP;    
      this.firstPointer.append(this.firstValue);
      this.firstValue.style.display = this.firstPointer.style.display;
      this.firstValue.style.left = - 7 * this.firstValue.innerHTML.length;
      
      this.secondValue.className = 'slider-value2';
      this.secondValue.innerHTML = this.config.startSP ;
      this.secondPointer.append(this.secondValue); 
    };
    if (this.config.quantityPointer === '2'){
      this.dialColor.style.left = +this.firstPointer.style.left.slice(0, -2) +'px';
      this.dialColor.style.width = +this.secondPointer.style.left.slice(0, -2) - +this.firstPointer.style.left.slice(0, -2) +'px'; 
    }else if (this.config.quantityPointer === '1'){
      this.dialColor.style.left = 0;
      this.dialColor.style.width = +this.secondPointer.style.left.slice(0, -2); 
    };   */ 
