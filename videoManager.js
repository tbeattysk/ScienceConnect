let currentCatItem = null;

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'xC0RvxezEHE',
        playerVars: {
            'playsinline': 1,
            'controls':0,
            'disablekb':1,
            'modestbranding':1,
            'rel':0,
            'showinfo':0,
            'cc_load_policy':1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function onPlayerReady(event) {
    //event.target.playVideo();
    player.h.style.display = "none";
}
function onPlayerStateChange(event) {
    //print(event)
    if (event.data == YT.PlayerState.CUED) {
        //setTimeout(stopVideo, 6000);
        //console.log("here")
        done = true;
        
    }
}
function pauseVideo() {
    player.pauseVideo();
    if(lastId == 0){
        showQuestions()
    }else{
        showModel();
    }
    //player.h.style.display = "none";
}
function playVideo(catItem){
    nextCue = 0;
    currentCatItem = catItem;
    playing = true;
    player.h.style.display = "block";
    player.seekTo(catItem.start,true);
    player.playVideo();
    setTimeout(pauseVideo, (catItem.end-catItem.start)*1000);
}
function getEnding(){
    return endTime
}
function checkCues(){

    if(nextCue < currentCatItem.cues.length &&
        currentCatItem.cues[nextCue].time<player.getCurrentTime()){
        runCue(currentCatItem.cues[nextCue])
        nextCue++;
    }
}
let catalogue = [
    {
        title: "Introduction",
        id: "0",
        start: 0,
        end: 54.5,
        cues: [
            {
                time: 19,
                type: "expose",
                target: "1",
            },
            {
                time: 46,
                type: "expose",
                target: "2"
            }
        ]
    },
    {
        title: "Coral in and out of system",
        id: "a1",
        start: 55,
        end: 82,
        cues: [
        ]
    },
    {
        title: "Coral growth",
        id: "b1",
        start: 82,
        end: 127,
        cues: [
        ]
    },
    {
        title: "Seaweed movement",
        id: "a2",
        start: 127,
        end: 174,
        cues: [
        ]
    }
]