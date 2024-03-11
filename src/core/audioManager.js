// Create AudioContext with fallback for older browsers
const audioContext = new window.AudioContext;

if (!audioContext) {
    console.error('Web Audio API is not supported in this browser');
}


// Function to load a sound
async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

// Function to play a sound
function playSound(audioBuffer, loop = false) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = loop;
    source.connect(audioContext.destination);
    source.start();
    return source;
}

// Load and play background music
let backgroundMusicBuffer;
loadSound(``).then(buffer => {
    backgroundMusicBuffer = buffer;
    playSound(backgroundMusicBuffer, true); // True to loop
});

// Function to play a sound effect
function playSoundEffect(soundEffectUrl) {
    loadSound(soundEffectUrl).then(playSound); // False for no loop, default behavior
}

// Example of playing a sound effect
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Play sound effect on space bar press
        playSoundEffect('path/to/your/sound/effect.mp3');
    }
});
