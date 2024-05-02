// Define audioContext globally but don't assign it yet
let audioContext;

// Function to initialize or resume the AudioContext
function initAudioContext() {
    // If audioContext doesn't exist, create it
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
function playSound(audioBuffer, loop = false) {
    if (!audioContext) return; // Make sure audioContext is initialized

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop;
    source.connect(audioContext.destination);
    source.start();
}

// Load and play background music
let backgroundMusicBuffer;
loadSound('src/assets/audio/Silent Hill 2 OST - The Day Of Night.mp3').then(buffer => {
    backgroundMusicBuffer = buffer;
    playSound(backgroundMusicBuffer, true); // True to loop
    removeInitListeners();
});

// existing functions to play sounds  check if audioContext exists and is running
// Example of playing a sound effect
function playSoundEffect(soundEffectUrl) {
    if (!audioContext) return; // Make sure audioContext is initialized

    loadSound(soundEffectUrl).then(buffer => {
        playSound(buffer);
    });
}

// Don't forget to remove the event listeners when they're no longer needed
function removeInitListeners() {
    document.removeEventListener('click', initAudioContext);
    document.removeEventListener('keydown', initAudioContext);
}

// Example usage
// Assuming you have a button on your page to start the music
document.addEventListener('click', () => {
    // Initialize audio context on user interaction
    initAudioContext();

    // Play the background music
    if (backgroundMusicBuffer) {
        playSound(backgroundMusicBuffer, true);
    }
});
