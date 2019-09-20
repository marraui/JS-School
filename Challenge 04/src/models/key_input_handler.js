function KeyboardInputHandler(keys, sustain) {
    this.keys = keys;
    this.keysDown = new Set();
    this.sustain = sustain;
}

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

KeyboardInputHandler.prototype.keyDownListener = function (event) {
    var keyPressed;
    var notePressed;
    var element;
    console.log(event.keyCode);

    if (this.keysDown.has(event.keyCode)) return;
    if (!this.keyCodeToChar[event.keyCode]) return;
    if (this.keyCodeToChar[event.keyCode] === 'spacebar') {
        if(!this.sustain.checked) {
            this.sustain.checked = true;
            var ev = document.createEvent('Event');
            ev.initEvent('change', true, false);
            this.sustain.dispatchEvent(ev);
        }
        return;
    }

    keyPressed = this.keyCodeToChar[event.keyCode];
    notePressed = this.charToNote[keyPressed];
    console.log(`note: ${notePressed}`);
    console.log(`pressed ${keyPressed}`);
    
    this.keys[notePressed].start();
    this.keysDown.add(event.keyCode);
    element = document.getElementById(notePressed);
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
    var sustain;
    if (!this.keyCodeToChar[event.keyCode]) return;
    if (this.keyCodeToChar[event.keyCode] === 'spacebar') {
        if (this.sustain.checked) {
            this.sustain.checked = false;
            var ev = document.createEvent('Event');
            ev.initEvent('change', true, false);
            this.sustain.dispatchEvent(ev);
        } 
        return;
    }
    keyReleased = this.keyCodeToChar[event.keyCode];
    noteReleased = this.charToNote[keyReleased];
    console.log(`note: ${noteReleased}`);
    console.log(`released ${keyReleased}`);
    element = document.getElementById(noteReleased);
    element.classList.remove('white-key-pressed');
    element.classList.remove('black-key-pressed');
    sustain = document.getElementById('sustain');
    this.keysDown.delete(event.keyCode);
    if (sustain.checked) return;
    this.keys[noteReleased].stop();
}