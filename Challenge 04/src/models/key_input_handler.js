// Class for handling key inputs
function KeyboardInputHandler(keys, sustain) {
    this.keys = keys; // Map from key note to MediaPlayer
    this.keysDown = new Set(); // Set that contains all keys that are currently down
    this.sustain = sustain; // Sustain element
}

// Map from char to keycode
KeyboardInputHandler.prototype.charToKeyCode = {
    'S': 83,
    'D': 68,
    'G': 71,
    'H': 72,
    'J': 74,
    'W': 87,
    'E': 69,
    'T': 84,
    'Y': 89,
    'U': 85,
    'spacebar': 32,
    'Q': 81,
    'R': 82,
    '2': 50,
    '3': 51,
    '5': 53,
    '6': 54,
    '7': 55,
    'Z': 90,
    'X': 88,
    'C': 67,
    'V': 86,
    'B': 66,
    'N': 78,
    'M': 77
};

// Map for keycode to char
KeyboardInputHandler.prototype.keyCodeToChar = {
    83: 'S',
    68: 'D',
    71: 'G',
    72: 'H',
    74: 'J',
    87: 'W',
    69: 'E',
    84: 'T',
    89: 'Y',
    85: 'U',
    32: 'spacebar',
    81: 'Q',
    82: 'R',
    50: '2',
    51: '3',
    53: '5',
    54: '6',
    55: '7',
    90: 'Z',
    88: 'X',
    67: 'C',
    86: 'V',
    66: 'B',
    78: 'N',
    77: 'M'
}

// Map from char to musical note
KeyboardInputHandler.prototype.charToNote = {
    'Z': 'C4',
    'X': 'D4',
    'C': 'E4',
    'V': 'F4',
    'B': 'G4',
    'N': 'A4',
    'M': 'B4',
    'S': 'C4-sharp',
    'D': 'D4-sharp',
    'G': 'F4-sharp',
    'H': 'G4-sharp',
    'J': 'A4-sharp',
    'Q': 'C5',
    'W': 'D5',
    'E': 'E5',
    'R': 'F5',
    'T': 'G5',
    'Y': 'A5',
    'U': 'B5',
    '2': 'C5-sharp',
    '3': 'D5-sharp',
    '5': 'F5-sharp',
    '6': 'G5-sharp',
    '7': 'A5-sharp'
}

// Listener for the keydown event
KeyboardInputHandler.prototype.keyDownListener = function (event) {
    var keyPressed;
    var notePressed;
    var element;

    if (this.keysDown.has(event.keyCode)) return; // If key is already down down't do anything
    if (!this.keyCodeToChar[event.keyCode]) return; // If the keyboard input doesn't map to any piano key ignore

    // If the input is a spacebar and the sustain isnt' activated then activate it
    if (this.keyCodeToChar[event.keyCode] === 'spacebar') {
        if(!this.sustain.checked) {
            this.sustain.checked = true;
            var ev = document.createEvent('Event');
            ev.initEvent('change', true, false);
            this.sustain.dispatchEvent(ev);
        }
        return;
    }

    keyPressed = this.keyCodeToChar[event.keyCode]; // Get the keyboard key that's being pressed
    notePressed = this.charToNote[keyPressed]; // Get the musical note that corresponds to the key input
    
    this.keys[notePressed].start(); // Start playing the audio corresponding to that note
    this.keysDown.add(event.keyCode); // Add the key to the keysDown set
    element = document.getElementById(notePressed); 

    // Change the style of the piano key being pressed
    if (element.classList.contains('white-key')) {
        element.classList.add('white-key-pressed');
    } else {
        element.classList.add('black-key-pressed');
    }
}

KeyboardInputHandler.prototype.keyUpListener = function (event) {
    var keyReleased
    var noteReleased
    var element;

    if (!this.keyCodeToChar[event.keyCode]) return; // If the keyboard input doesn't map to any piano key ignore

    // If the input is a spacebar and the sustain is activated then deactivate it
    if (this.keyCodeToChar[event.keyCode] === 'spacebar') {
        if (this.sustain.checked) {
            this.sustain.checked = false;
            var ev = document.createEvent('Event');
            ev.initEvent('change', true, false);
            this.sustain.dispatchEvent(ev);
        } 
        return;
    }
    keyReleased = this.keyCodeToChar[event.keyCode]; // Get the keyboard key that's being released
    noteReleased = this.charToNote[keyReleased]; // Get the musical note that is mapped to that key

    // Change the style of the piano key
    element = document.getElementById(noteReleased);
    element.classList.remove('white-key-pressed');
    element.classList.remove('black-key-pressed');

    this.keysDown.delete(event.keyCode); // Remove the key from the keysDown set

    // If sustain isn't activated stop the sound
    if (this.sustain.checked) return;
    this.keys[noteReleased].stop();
}