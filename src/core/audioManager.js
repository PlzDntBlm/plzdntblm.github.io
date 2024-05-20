// Define audioContext, gainNode, and backgroundMusicSource globally but don't assign them yet
let audioContext;
let gainNode;
let backgroundMusicSource;
let isPlaying = true; // Added to keep track of the play/pause state
let currentTime = 0; // To store the current playback position
let startTime = 0; // To store the time when playback starts

// Function to initialize or resume the AudioContext
function initAudioContext() {
    // If audioContext doesn't exist, create it
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create a gain node for volume control
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);

        // Set initial volume
        gainNode.gain.value = 0.5; // Set default volume to 50%
    }

    // If audioContext is in a suspended state, resume it
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Add event listeners to resume AudioContext on user interaction
document.addEventListener('click', initAudioContext);
document.addEventListener('keydown', initAudioContext);

// Function to load a sound
async function loadSound(url) {
    // Wait until the AudioContext is initialized
    while (!audioContext) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    // Now we can be sure audioContext is initialized
    return audioContext.decodeAudioData(arrayBuffer);
}

// Function to play a sound
function playSound(audioBuffer, loop = false, offset = 0) {
    if (!audioContext) return; // Make sure audioContext is initialized

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop;
    source.connect(gainNode); // Connect to the gain node instead of the destination
    source.start(0, offset);
    return source;
}

// Function to stop a sound
function stopSound(source) {
    if (source) {
        source.stop();
    }
}

// Load and play background music
let backgroundMusicBuffer;
loadSound('src/assets/audio/Silent Hill 2 OST - The Day Of Night.mp3').then(buffer => {
    backgroundMusicBuffer = buffer;
    backgroundMusicSource = playSound(backgroundMusicBuffer, true); // True to loop, assign to backgroundMusicSource
    startTime = audioContext.currentTime; // Set the start time
    console.warn("Background music loaded and playing");
    removeInitListeners();
    playButton.classList.add('hidden');
    pauseButton.classList.remove('hidden');
    isPlaying = true;
});

// Example of playing a sound effect
function playSoundEffect(soundEffectUrl) {
    if (!audioContext) return; // Make sure audioContext is initialized

    loadSound(soundEffectUrl).then(buffer => {
        playSound(buffer);
    });
}

// Don't forget to remove the event listeners when they're no longer needed
function removeInitListeners() {
    console.warn("Removing event listeners");
    document.removeEventListener('click', initAudioContext);
    document.removeEventListener('keydown', initAudioContext);
}

// Volume control
const volumeSlider = document.getElementById('volumeSlider');
volumeSlider.addEventListener('input', (event) => {
    if (gainNode) {
        gainNode.gain.value = event.target.value;
    }
});

// Play/Pause control using images
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');

playButton.addEventListener('click', () => {
    if (!isPlaying) {
        // Play the music from where it was paused
        backgroundMusicSource = playSound(backgroundMusicBuffer, true, currentTime);
        startTime = audioContext.currentTime - currentTime; // Calculate the start time
        playButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
        isPlaying = true;
    }
});

pauseButton.addEventListener('click', () => {
    if (isPlaying) {
        // Pause the music
        currentTime = audioContext.currentTime - startTime; // Store the current playback position
        stopSound(backgroundMusicSource);
        playButton.classList.remove('hidden');
        pauseButton.classList.add('hidden');
        isPlaying = false;
    }
});
