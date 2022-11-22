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
    }
    show(){
        noStroke();
        fill(120,255);
        rect(this.x, this.y, this.w, this.h);
        fill(0)
        text("Modeling tool isn't built yet. Pen and paper?",this.x+20, this.y+this.h/2)
    }
    showButtons(){
        this.againButton.hide = false
        this.questionButton.hide = false
    }
    hideButtons(){
        this.againButton.hide = true
        this.questionButton.hide = true
    }
}
class ModelReceiver{
    constructor(){

    }
}