
//for play/pause button! http://zenozeng.github.io/p5.js-svg/

class Button{
    constructor(text,x,y,w,h,r,event){
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.event = event;
        this.hide = false;
    }

    show() {
        if(!this.hide){
            textAlign(CENTER);
            stroke(0);
            // Different fill based on state
            if (this.rollover) {
            fill(150);
            } else {
            fill(175, 200);
            }
            noStroke();
            rect(this.x, this.y, this.w, this.h, this.r);
            fill(0)
            noStroke()
            if(this.text == ">"){
                fill(255,80,80);
                beginShape()
                vertex(this.x+this.h/4, this.y+this.h/4);
                vertex(this.x+3*this.h/4, this.y+this.h/2);
                vertex(this.x+this.h/4, this.y+3*this.h/4);
                endShape()
            }else{
                text(this.text,this.x+this.w/2, this.y+this.h/2+5)
            }
        }
    }

    over() {
        // Is mouse over object
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
          this.rollover = true;
        } else {
          this.rollover = false;
        }
    }

    clicked(){
        if (!this.hide && mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            this.event();
        }
    }
}