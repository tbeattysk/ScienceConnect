class SystemModel {
    constructor(){
        this.x = 20;
        this.y = 0;
        this.w = 640;
        this.h = 392;
        this.drags = [];
        this.againButton = new Button("< Play Again",
            25, 320, 100, 30, 20,
            function(){
                playAgain();
            });
        this.againButton.hide = true
        buttons.push(this.againButton);
        this.questionButton = new Button("Questions >",
            25, 355, 100, 30, 20,
            function(){
                showQuestions();
            })
        this.questionButton.hide = true
        buttons.push(this.questionButton)
        this.model = new ModelReceiver(this)
        receivers.push(this.model)
    }
    show(){
        noStroke();
        fill(220,255);
        rect(this.x, this.y, this.w, this.h);
        //fill(0)
        //text("Modeling tool isn't built yet. Pen and paper?",this.x+20, this.y+this.h/2)
        this.model.show();
    }
    showButtons(){
        this.againButton.hide = false
        this.questionButton.hide = false
        this.model.active = true
    }
    hideButtons(){
        this.againButton.hide = true
        this.questionButton.hide = true
        this.model.active = false
    }
}
class ModelReceiver{
    constructor(parent){
        this.parent = parent
        this.x = parent.x;
        this.y = parent.y;
        this.w = parent.w;
        this.h = parent.h;

        this.objs = [];
        this.curves = [];
        this.active = false;

    }
    show(){
        this.curves.forEach(c=>{
            c.show();
        })
    }
    receive(obj){
        if(this.active && (obj.x > this.x && obj.x <this.x+this.w && obj.y > this.y && obj.y < this.y+this.h) ){
            this.objs.push(obj);
            obj.receiver = this;
            return true;
        }
        return false;
    }
    remove(obj){
        let i = this.objs.findIndex(o => {
            return o === obj;})
        this.objs.splice(i,1);
    }
    createLine(){
        this.curves.push(new Curve(mouseX, mouseY))
    }
}


class Curve{
    constructor(x,y){
        this.text = "text";
        this.dragging = true;
        this.dragging = true;
        this.x1 = x;
        this.y1 = y;
        this.x2 = x;
        this.y2 = y;
        this.x3 = x;
        this.y3 = y;
        this.starter = true;
        this.textX = 0;
        this.textY = 0;
        this.starter = true;
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;
        this.activePoint = 3;
        this.clicked = false;
        this.mousePressed = true;
    }
    show(){
        noFill();
        stroke(0);
        beginShape();
        curveVertex(this.x1, this.y1); 
        curveVertex(this.x1, this.y1);
        curveVertex(this.x2, this.y2);
        curveVertex(this.x3, this.y3);
        curveVertex(this.x3, this.y3);
        endShape();
        noStroke();
        fill(130);
        
        
        if(!mouseIsPressed){
            this.activePoint = null;
            this.clicked = false;
            this.starter = false
        }
 
        if(this.activePoint == null && this.button == null){
            if (dist(mouseX,mouseY, this.x1, this.y1)<15) {
                ellipse(this.x1, this.y1, 10, 10);
                if(mouseIsPressed){
                    this.activePoint = 1;
                    this.mouseOffsetX = mouseX - this.x1
                    this.mouseOffsetY = mouseY - this.y1
                }
            }
            if (dist(mouseX,mouseY, this.x2, this.y2)<15) {
                ellipse(this.x2, this.y2, 10, 10);
                if(mouseIsPressed){
                    this.activePoint = 2;
                    this.mouseOffsetX = mouseX - this.x2
                    this.mouseOffsetY = mouseY - this.y2
                }
            }
            if (dist(mouseX,mouseY, this.x3, this.y3)<15) {
                ellipse(this.x3, this.y3, 10, 10);
                if(mouseIsPressed){
                    this.activePoint = 3;
                    this.mouseOffsetX = mouseX - this.x3
                    this.mouseOffsetY = mouseY - this.y3
                }
            }
            if (mouseX > this.x2 + this.textX && 
            mouseX < this.x2 + this.textX + 50 && 
            mouseY > this.y2 + this.textY -15 &&
            mouseY  < this.y2 + this.textY ){
                rect(this.x2+this.textX, this.y2 + this.textY-15,50,15)
                if(mouseIsPressed && this.clicked == false){
                    this.activePoint = 4;
                    this.mouseOffsetX = mouseX - (this.x2+this.textX)
                    this.mouseOffsetY = mouseY - (this.y2+this.textY)
                    setTimeout(this.editText.bind(this), 200)
                    this.clicked = true
                }
            }
        }
        textAlign(LEFT)
        text(this.text, this.x2+this.textX, this.y2+this.textY);
        
        if(this.activePoint){
            if(this.activePoint == 1){
                this.x1 = mouseX-this.mouseOffsetX;
                this.y1 = mouseY-this.mouseOffsetY;
            }
            if(this.activePoint == 2){
                this.x2 = mouseX-this.mouseOffsetX;
                this.y2 = mouseY-this.mouseOffsetY;
            }
            if(this.activePoint == 3){
                this.x3 = mouseX-this.mouseOffsetX;
                this.y3 = mouseY-this.mouseOffsetY;
                if(this.starter){
                    this.x2 = this.x1+(this.x3 - this.x1)/2
                    this.y2 = this.y1+(this.y3 - this.y1)/2
                }
                
            }
            if(this.activePoint == 4){
                this.textX = (mouseX-this.x2)-this.mouseOffsetX;
                this.textY = (mouseY-this.y2)-this.mouseOffsetY;
            }
        }
    }
    editText(){
    if(!mouseIsPressed){
        this.inp = createInput(this.text);
        this.inp.position(this.x2+this.textX-20, this.y2+this.textY-15);
        this.inp.size(100);
        this.button = createButton("Ok");
        this.button.position(this.x2+this.textX+100, this.y2+this.textY-15);
        this.button.mousePressed(this.okCallBack.bind(this));
    }
    }
    
    okCallBack(){
    this.text = this.inp.value()
    this.inp.remove();
    this.button.remove();
    this.button = null
    this.inp = null
    this.clicked = false;
    }
}