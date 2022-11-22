let concepts = [];
let drags = [];
let receivers = [];
let questions = [];
let buttons = [];
let model
let canvas;
let hideQuestions = true;
let hideModel = true;
let lastId
let introButton = null;
let playing = false

function setup() {
    canvas = createCanvas(800, 500);
    noSmooth();
    model = new SystemModel();
    let conceptX = 680;
    let conceptY = 30;
    let conceptYDelta = 70;
    conceptsRoot.forEach(concept=>{
        concepts.push(new Concept(
            concept.title,
            concept.id,
            concept.questions,
            conceptX,
            conceptY,));
        conceptY += conceptYDelta;
    })
    let questionX = 150;
    let questionY = 150;
    let questionYDelta = 70;
    questionsRoot.forEach(q =>{
        questions.push(new Question(
            q.title,
            q.id,
            questionX,
            questionY
        ));
        questionY += questionYDelta;
    });
    introButton = new Button("Replay intro",
            150, 70, 100, 30, 10,
            function(){
                playClip("0");
            }
        )
    buttons.push(introButton)
    introButton.hide = true;
    buttons.push(new Button("Begin",
        300,200,70,30,10,
        function(){
            playClip("0");
            let i = buttons.findIndex(b=>{
                return this === b
            })
            buttons.splice(i,1);
        }))
}
  
function draw() {
    if(playing){
        checkCues();
    }
    clear();
    concepts.forEach( concept =>{
        concept.over();
        concept.show();
    })
    if(!hideQuestions){
        questions.forEach(q=>{
            q.show();
        })
        drags.forEach(drag =>{
            drag.update();
            drag.over();
            drag.show();
        })  
    }else if(!hideModel){
        model.show();
    }
    buttons.forEach(b =>{
        b.over();
        b.show();
    })
 
}

function mousePressed() {
    concepts.forEach( concept =>{
        concept.pressed();
    })
    drags.forEach( drag =>{
        drag.pressed();
    })
  }
 
function mouseReleased() {
    // Quit dragging
    let dropped;
    drags.every( drag =>{
        drag.released() ? dropped = drag : null;
        if(dropped){return false}
        return true;
    })
    if(dropped){
        receivers.every(rec =>{
            if(rec.receive(dropped)){
                return false;
            }
            return true;
        })
        for (let i = drags.length-1 ; i >=0 ; i--) {
            if(drags[i].receiver == null){
                drags.splice(i,1);
            }
        }
    }
    questions.forEach(q=>{
        q.deactivate();
    })
}

function mouseClicked(){
    buttons.forEach(b=>{
        b.clicked();
    })
}

function activateQuestions(qids){
    questions.forEach(q=>{
        if(qids.includes(q.id)){
            q.activate();
        }else{
            q.deactivate();
        }
    })
}

function playClip(id){
    clearQuestions();   
    lastId = id;
    let catItem = catalogue.find(c=>{
        return c.id == id;
    })
    playVideo(catItem);
}
function runCue(cue){
    switch (cue.type){
        case "expose":
            concepts.find(c=>{
                return c.id == cue.target
            }).visible = true
    }
}
function playAgain(){
    playClip(lastId)
}

function showModel(){
    introButton.hide = true;
    hideQuestions = true;
    hideModel = false;
    model.showButtons()
}

function showQuestions(){
    if(introButton == null){
        
    }else{
        introButton.hide = false
    }
    hideQuestions = false;
    hideModel = true;
    model.hideButtons();
}

function clearQuestions(){
    introButton.hide = true
    hideQuestions = true;
    hideModel = true
    model.hideButtons();
    questions.forEach(q=>{
        q.hidePlay()
        q.receivers.forEach(r=>{
            if(r.obj){
                let oldObj = r.obj
                oldObj.receiver = null;
                for (let i = drags.length-1 ; i >=0 ; i--) {
                    if(drags[i].receiver == null){
                        drags.splice(i,1);
                    }
                }
                r.obj = null
            }
        })
    })
}

let conceptsRoot = [
    {title: "coral",
     id:  1,
     questions: ['a','b'], 
    },
    {title: "seaweed",
     id:  2,
     questions: ['a'], 
    },
    {title: "fish",
     id:  3,
     questions: [], 
    },
    {title: "humans",
     id:  4,
     questions: [], 
    },
];

let questionsRoot = [
    {title: "How does % move in and out of the system?",
    id: 'a'
    },
    {title: "What helps % grow in the system?",
    id: 'b'
    },
    {title: "How do % and % interact in the system?",
    id: 'c'
    }
]