class Draggable {
    constructor(gen) {
  
        this.dragging = true; // Is the object being dragged?
        this.rollover = true; // Is the mouse over the ellipse?
        this.receiver = null;
        this.text = gen.text;
        this.id = gen.id;
        this.questions = gen.questions
        this.x = gen.x;
        this.y = gen.y;
        
        // Dimensions
        this.w = gen.w;
        this.h = gen.h;
        this.r = gen.r;
        this.pressed();
        activateQuestions(this.questions)
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
      stroke(0);
      // Different fill based on state
      if (this.dragging) {
        fill(50,100);
        rect(this.x, this.y, this.w, this.h, this.r);
        fill(150);
        this.x -= 2;
        this.y -= 2;
      } else if (this.rollover) {
        fill(150);
      } else {
        fill(175, 200);
      }
      noStroke();
      rect(this.x, this.y, this.w, this.h, this.r);
      fill(0)
      noStroke()
      text(this.text,this.x+20, this.y+this.h/2+5)
    }
  
    pressed() {
      // Did I click on the rectangle?
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.dragging = true;
        if(this.receiver){
          this.receiver.parent.hidePlay();
          this.receiver.obj = null;
          
        }
        this.receiver = null;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
        activateQuestions(this.questions)
      }
    }
  
    released() {
      // Quit dragging
      if(this.dragging){
        this.x+=2;
        this.y+=2;
        this.dragging = false;
        this.recieved = false;
        return true;
      }
      return false;
    }

  }