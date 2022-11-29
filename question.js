class Question{
    constructor(title,id,x,y){
        this.title = title.split("%");
        this.receivers = []
        let runningX = 0
        this.title.forEach((str,i) => {
            runningX += textWidth(str) + 5
            if(i < this.title.length-1){
                let newR = new Reciever(this)
                this.receivers.push(newR)
                receivers.push(newR) // for interaction
                runningX += this.receivers[0] + 5;
            }
        });

        this.id = id

        this.x = x;
        this.y = y;

    }
    show(){
        textAlign(LEFT);
        fill(200,240)
        noStroke()
        rect(this.x-10, this.y - 33, 450, 60)
        
        let runningX = this.x
        let receiverIndex=0
        this.title.forEach((str,i) => {
            noStroke()
            fill(0)
            text(str,runningX, this.y);
            runningX += textWidth(str) + 5
            if(i < this.title.length-1){
                this.receivers[receiverIndex].show(runningX,this.y-20)
                runningX += this.receivers[0].w + 5;
                receiverIndex++;
            }
        })
    }
    activate(){
        this.receivers.forEach(r=>{
            r.active = true
        })
    }
    deactivate(){
        this.receivers.forEach(r=>{
            r.active = false
        })
    }
    checkReady(){
        let allReady = true;
        this.receivers.forEach(r=>{
            if(r.obj == null){allReady = false}
        })
        if(allReady){
            let receiver0 = this.receivers[0];
            let myId = this.id
            this.hidePlay()
            this.myButton = new Button(">",
                this.x - 80, this.y-33, 60, 60,30,
                function(){
                    playClip(myId+receiver0.obj.id)
                })
            buttons.push(this.myButton)
        }
    }
    hidePlay(){
        if(this.myButton){
            let bindex = buttons.findIndex(b=>{
                return b === this.myButton
            })
            buttons.splice(bindex, 1)
            this.myButton = null
        }
    }
}