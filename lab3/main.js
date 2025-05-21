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


for (let i = 0; i < 4; i++) {
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
}

const playAllButton = document.createElement("button");
playAllButton.innerText = "Play All Channels";
playAllButton.onclick = playAllChannels;
playAllButton.id = "all"
controlsContainer.appendChild(playAllButton);

const metronomeStartButton = document.createElement("button");
metronomeStartButton.innerText = "Start Metronome";
metronomeStartButton.id = "startMetronom"
metronomeStartButton.onclick = startMetronom;
controlsContainer.appendChild(metronomeStartButton);

const metronomeStopButton = document.createElement("button");
metronomeStopButton.innerText = "Stop Metronome";
metronomeStopButton.id = "stopMetronom"
metronomeStopButton.onclick = stopMetronom;
controlsContainer.appendChild(metronomeStopButton);

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
}

function stopRecording(channelNumber) {
    isRecording[channelNumber] = false;
}

function playChannel(channelNumber) {
    if (channels[channelNumber].length === 0) return;
    channels[channelNumber].forEach(note => {
        setTimeout(() => {
            play(sounds[note.key]);
        }, note.time);
    });
}

function playAllChannels() {
    channels.forEach((channel, index) => {
        playChannel(index);
    });
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
    clearInterval(metronomPlaying);
    metronomPlaying = null;
    console.log("metronom stopped");
}
