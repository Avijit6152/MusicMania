// Initialize the Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();

// Variables to store audio buffers
let mixBuffer1 = null;
let mixBuffer2 = null;

// Variables for playback control
let mixSource1 = null;
let mixSource2 = null;

// Function to load and decode audio files
function loadAudio(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer));
}

// Mix Songs Function
function mixSongs() {
    let song1Url = document.getElementById("mixSong1").value;
    let song2Url = document.getElementById("mixSong2").value;

    // Load and decode both songs
    Promise.all([
        loadAudio(song1Url),
        loadAudio(song2Url)
    ]).then(buffers => {
        mixBuffer1 = buffers[0];
        mixBuffer2 = buffers[1];
        alert("Songs loaded and ready to mix!");
    }).catch(error => {
        console.error("Error loading audio files:", error);
        alert("Failed to load one or both songs.");
    });
}

// Function to play the mixed songs
function playMix() {
    if (mixBuffer1 && mixBuffer2) {
        // Stop any existing playback
        stopMix();

        // Create buffer sources
        mixSource1 = audioCtx.createBufferSource();
        mixSource2 = audioCtx.createBufferSource();

        // Set buffers
        mixSource1.buffer = mixBuffer1;
        mixSource2.buffer = mixBuffer2;

        // Create gain nodes to control volume if needed
        let gainNode1 = audioCtx.createGain();
        let gainNode2 = audioCtx.createGain();

        // Connect sources to gain nodes
        mixSource1.connect(gainNode1);
        mixSource2.connect(gainNode2);

        // Adjust volumes if desired
        gainNode1.gain.value = 0.5; // Adjust volume for song 1
        gainNode2.gain.value = 0.5; // Adjust volume for song 2

        // Connect gain nodes to destination (speakers)
        gainNode1.connect(audioCtx.destination);
        gainNode2.connect(audioCtx.destination);

        // Start playback
        mixSource1.start(0);
        mixSource2.start(0);
    } else {
        alert("Please load songs first by clicking the 'Mix Songs' button.");
    }
}

// Function to stop the mixed songs
function stopMix() {
    if (mixSource1) {
        mixSource1.stop();
        mixSource1 = null;
    }
    if (mixSource2) {
        mixSource2.stop();
        mixSource2 = null;
    }
}
