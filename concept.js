class Concept {
    constructor(title,id,questions,x,y) {

        this.visible = false;
        this.state = 0;

        this.text = title;
        this.textYOffset =0;
        if(title.split("\n").length > 1){
          this.textYOffset = -9
        }
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
      if ((this.state == 2 ||this.state ==3) && mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.state = 3
      } else if(this.state == 3){
        this.state = 2
      }
    }

  
    show() {
      if(this.visible){
        textAlign(CENTER);
        noStroke();
        switch(this.state){
          case 0: //hidden
            this.fill = color(0,0,0,0)
            this.stroke = color(175,180)
            this.textColor = color(0,0)
            break;
          case 1: //anticipate
            this.fill = color(175, 200)
            this.stroke = color(0,0)
            this.textColor = color(0)
            break;
          case 2: //active
            this.fill = color(175, 200)
            this.stroke = color(0,0)
            this.textColor = color(0)
            break;
          case 3: //rollover
            this.fill = color(150)
            this.stroke = color(0,0)
            this.textColor = color(0)
            break
          case 4: //inactive
            this.fill = color(180)
            this.stroke = color(0,0)
            this.textColor = color(255)
            break;
        }
        fill(this.fill)
        stroke(this.stroke)
        rect(this.x, this.y, this.w, this.h, this.r);
        noStroke();
        fill(this.textColor);
        text(this.text,this.x+this.w/2, this.y+this.h/2+5+ this.textYOffset)
      }
    }
  
    pressed() {
      if(this.state==3){
      // Did I click on the rectangle?
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          drags.push(new Draggable(this));
          // If so, keep track of relative location of click to corner of rectangle
          
        }
      }
    }
  }