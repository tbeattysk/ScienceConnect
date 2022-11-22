class Reciever{
    constructor(parent){
        this.x = 20;
        this.y = 20;
        this.w = 90;
        this.h = 30;
        this.parent = parent
        this.obj = null;
        this.active = false;
    }
    show(x,y){
        this.x = x;
        this.y = y;
        if(!this.obj){
            noFill();
            stroke(0);
            strokeWeight(1.5)
            if(this.active){
                rect(x, y, this.w, this.h);
            }else{
                line(this.x, this.y+this.h, this.x+this.w, this.y+this.h)
            }
        }
    }
    receive(obj){
        if(this.active && (obj.x > this.x-20 && obj.x <this.x+this.w && obj.y > this.y-20 && obj.y < this.y+this.h+20) ){
            if(this.obj){
                let oldObj = this.obj
                this.obj.receiver = null;
                oldObj.released()
            }
            this.obj = obj;
            obj.receiver = this;
            obj.x = this.x;
            obj.y = this.y;
            this.parent.checkReady();
            return true;
        }
        return false;
    }
}