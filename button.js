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
            text(this.text,this.x+20, this.y+this.h/2+5)
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