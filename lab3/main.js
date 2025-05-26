const sounds = {
    "a": document.querySelector(".clap"),
    "s": document.querySelector(".kick"),
    "d": document.querySelector(".boom"),
    "q": document.querySelector(".hihat"),
    "w": document.querySelector(".ride")
};

const channels = [[], [], [], []];
let isRecording = [false, false, false, false];

let startTime = [0, 0, 0, 0];
let isLooping = [false, false, false, false];
let loopIntervals = [null, null, null, null];

let isPlayingAll = false;
let playAllInterval = null;
let allActiveTimeouts = [];

const LOOP_DURATION = 4000; 

const keyboardContainer = document.createElement("div");
keyboardContainer.classList.add("keyboard");
document.body.appendChild(keyboardContainer);

const keys = ["a", "s", "d", "q", "w"];
keys.forEach((key) => {
    const keyButton = document.createElement("button");
    keyButton.innerText = key.toUpperCase();
    keyButton.setAttribute("data-key", key);
    keyButton.classList.add("key");
    keyboardContainer.appendChild(keyButton);
});

const controlsContainer = document.createElement("div");
controlsContainer.classList.add("controls");
document.body.appendChild(controlsContainer);



for (let i = 0; i < channels.length; i++) {
    const recordButton = document.createElement("button");
    recordButton.innerText = `Start Recording ${i + 1}`;
    recordButton.onclick = () => startRecording(i);
    controlsContainer.appendChild(recordButton);

    const stopButton = document.createElement("button");
    stopButton.innerText = `Stop Recording ${i + 1}`;
    stopButton.onclick = () => stopRecording(i);
    controlsContainer.appendChild(stopButton);

    const playButton = document.createElement("button");
    playButton.innerText = `Play Channel ${i + 1}`;
    playButton.onclick = () => playChannel(i);
    controlsContainer.appendChild(playButton);

    const loopButton = document.createElement("button");
    loopButton.id = `loop-btn`;
    loopButton.innerText = `Loop Channel ${i + 1}`;
    loopButton.onclick = () => toggleLoop(i);
    controlsContainer.appendChild(loopButton);
}

const playAllButton = document.createElement("button");
playAllButton.innerText = "Play All Channels";
playAllButton.onclick = playAllChannels;
playAllButton.id = "all";
controlsContainer.appendChild(playAllButton);


const playAllButtonLoop = document.createElement("button");
playAllButtonLoop.innerText = "Loop All Channels";
playAllButtonLoop.onclick = toggleLoopAll;
playAllButtonLoop.id = "loop-all"; 
controlsContainer.appendChild(playAllButtonLoop);

const stopAllButton = document.createElement("button");
stopAllButton.innerText = "Stop All Music";
stopAllButton.onclick = stopAllMusic;
stopAllButton.id = "stop-all";
controlsContainer.appendChild(stopAllButton);

const metronomeStartButton = document.createElement("button");
metronomeStartButton.innerText = "Start Metronome";
metronomeStartButton.id = "startMetronom";
metronomeStartButton.onclick = startMetronom;
controlsContainer.appendChild(metronomeStartButton);

const metronomeStopButton = document.createElement("button");
metronomeStopButton.innerText = "Stop Metronome";
metronomeStopButton.id = "stopMetronom";
metronomeStopButton.onclick = stopMetronom;
controlsContainer.appendChild(metronomeStopButton);

//NOWE dynamiczne dodawanie kanalow
function addChannel() {
    const newChannel = [];
    channels.push(newChannel);
    isRecording.push(false);
    startTime.push(0);
    isLooping.push(false);
    loopIntervals.push(null);

    const i = channels.length - 1;

    const recordButton = document.createElement("button");
    recordButton.innerText = `Start Recording ${i + 1}`;
    recordButton.onclick = () => startRecording(i);

    const stopButton = document.createElement("button");
    stopButton.innerText = `Stop Recording ${i + 1}`;
    stopButton.onclick = () => stopRecording(i);

    const playButton = document.createElement("button");
    playButton.innerText = `Play Channel ${i + 1}`;
    playButton.onclick = () => playChannel(i);

    const loopButton = document.createElement("button");
    loopButton.id = `loop-btn`;
    loopButton.innerText = `Loop Channel ${i + 1}`;
    loopButton.onclick = () => toggleLoop(i);

    controlsContainer.insertBefore(recordButton, playAllButton);
    controlsContainer.insertBefore(stopButton, playAllButton);
    controlsContainer.insertBefore(playButton, playAllButton);
    controlsContainer.insertBefore(loopButton, playAllButton);
}

document.addEventListener("keypress", (event) => {
    if (!sounds[event.key]) return; 
    play(sounds[event.key]);
    isRecording.forEach((recording, index) => {
        if (recording) {
            channels[index].push({
                key: event.key,
                time: Date.now() - startTime[index]
            });
        }
    });
});

function play(sound) {
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

function startRecording(channelNumber) {
    channels[channelNumber] = []; 
    startTime[channelNumber] = Date.now();
    isRecording[channelNumber] = true;
    setTimeout(() => {
        stopRecording(channelNumber);
    }, LOOP_DURATION);
}

function stopRecording(channelNumber) {
    isRecording[channelNumber] = false;
}

function playChannel(channelNumber) {
    if (channels[channelNumber].length === 0) return;
    channels[channelNumber].forEach(note => {
        const timeoutId = setTimeout(() => {
            play(sounds[note.key]);
        }, note.time);
        allActiveTimeouts.push(timeoutId);
    });
}

function toggleLoop(channelNumber) {
    if (isLooping[channelNumber]) {
        stopLoop(channelNumber);
    } else {
        startLoop(channelNumber);
    }
}

function startLoop(channelNumber) {
    if (channels[channelNumber].length === 0 || isLooping[channelNumber]) return;
    
    isLooping[channelNumber] = true;
    playChannelLoop(channelNumber);

    loopIntervals[channelNumber] = setInterval(() => {
        playChannelLoop(channelNumber);
    }, LOOP_DURATION);
}

function stopLoop(channelNumber) {
    if (loopIntervals[channelNumber]) {
        clearInterval(loopIntervals[channelNumber]);
        loopIntervals[channelNumber] = null;
    }
    isLooping[channelNumber] = false;
}

function playChannelLoop(channelNumber) {
    channels[channelNumber].forEach(note => {
        const timeoutId = setTimeout(() => {
            play(sounds[note.key]);
        }, note.time);
        allActiveTimeouts.push(timeoutId);
    });
}

function playAllChannels() {
    channels.forEach((channel, index) => {
        playChannel(index);
    });
}

function toggleLoopAll() {
    if (isPlayingAll) {
        stopLoopAll();
    } else {
        startLoopAll();
    }
}

function startLoopAll() {
    const hasContent = channels.some(channel => channel.length > 0);
    if (!hasContent || isPlayingAll) return;
    
    isPlayingAll = true;
    const loopAllBtn = document.getElementById('loop-all');
    if (loopAllBtn) {
        loopAllBtn.innerText = "Stop Loop All";
        loopAllBtn.classList.add('active-loop');
    }
    
    playAllChannels();
    
    playAllInterval = setInterval(() => {
        playAllChannels();
    }, LOOP_DURATION);
}

function stopLoopAll() {
    if (playAllInterval) {
        clearInterval(playAllInterval);
        playAllInterval = null;
    }
    isPlayingAll = false;
    
    const loopAllBtn = document.getElementById('loop-all');
    if (loopAllBtn) { 
        loopAllBtn.innerText = "Loop All Channels";
        loopAllBtn.classList.remove('active-loop');
    }
}

function stopAllMusic() {
    for (let i = 0; i < channels.length; i++) {
        stopLoop(i);
    }
    stopLoopAll();
    stopMetronom();
    allActiveTimeouts.forEach(timeoutId => {
        clearTimeout(timeoutId);
    });
    allActiveTimeouts = [];
    Object.values(sounds).forEach(sound => {
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    });
    console.log("All music stopped");
}

const bpm = 1000;
let metronomPlaying = null;

function startMetronom() {
    if (!metronomPlaying) {
        metronomPlaying = setInterval(() => {
            play(sounds["a"]);
        }, bpm);
        console.log("Metronom start");
    }
}

function stopMetronom() {
    if (metronomPlaying) {
        clearInterval(metronomPlaying);
        metronomPlaying = null;
        console.log("metronom stopped");
    }
}