class Concept {
    constructor(title,id,questions,x,y) {

        this.rollover = false; // Is the mouse over the ellipse?
        this.visible = false;
        this.active = true;

        this.text = title;
        this.id = id;
        this.questions = questions;

        this.x = x;
        this.y = y;
        // Dimensions
        this.w = 90;
        this.h = 30;
        this.r = 20
    }
  
    over() {
      // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
  
    }
  
    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
  
    }
  
    show() {
      if(this.visible){
        noStroke();
        
        // Different fill based on state
        if (this.rollover) {
          fill(150);
        } else {
         fill(175, 200);
        }
        rect(this.x, this.y, this.w, this.h, this.r);
        noStroke()
        fill(0);
        text(this.text,this.x+20, this.y+this.h/2+5)
      }
    }
  
    pressed() {
      if(this.visible && this.active){
      // Did I click on the rectangle?
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          drags.push(new Draggable(this));
          // If so, keep track of relative location of click to corner of rectangle
          
        }
      }
    }
  }