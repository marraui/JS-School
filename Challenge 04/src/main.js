// Object with the notes mapped to a MediaPlayer for that note
var keys = {};

// Set containing all keys that are currently pressed
var keysPressed = new Set();

// Element for the sustain checkbox
var sustain = document.getElementById('sustain');


// Initialize select for soundtypes
function initializeSoundSelector () {
    var soundSelector = document.getElementById('sound-select');
    var selectOptions = soundSelector.querySelector('.select-options');
    var options = selectOptions.children;
    for (var i = 0; i < options.length; i++) {
        options.item(i).parentElement.parentElement
        options.item(i).addEventListener('click', function () {
            var selectWrapper = this.parentElement.parentElement;
            var customSelect = selectWrapper.querySelector('.custom-select');
            customSelect.textContent = this.textContent;
            initializeMedia(this.id);
        });
    }
}

function keyPressed(event) {
    // Add key to the keysPressed set
    keysPressed.add(this.id);

    // Change appearance when pressed
    if(this.classList.contains('black-key')) this.classList.add('black-key-pressed');
    else this.classList.add('white-key-pressed');
    play(this.id);
}

function keyReleased(event) {
    keysPressed.forEach(function (key) {
        var keyElement = document.getElementById(key);
        if (!sustain.checked) {
            keys[key].stop();
        }

        keyElement.classList.remove('black-key-pressed');
        keyElement.classList.remove('white-key-pressed');
    });
    keysPressed.clear();
}

function initializeMedia (audioType) {
    var keysAttributes = Object.keys(keys);
    keysAttributes.forEach(function (key) {
        keys[key] = new MediaPlayer(`../media/${audioType}/${key}.mp3`);
    });
}

// Generate a file name based on the key and its octave
function getElementFileName (element) {
    // Get the name of the mp3 file
    var octave = element.closest('.octave-container');
    var octaveNumber = octave.id.match(/[0-9]$/);
    if (octaveNumber == null) {
        return null;
    }
    octaveNumber = octaveNumber[0];

    var fileName;
    for (var j = 0; j < element.classList.length; j++) {
        var className = element.classList.item(j);
        var regRes = className.match(/[A-G]/);
        if (regRes != null) {
            fileName = className.slice(0, 1) + octaveNumber + className.slice(1);
            break;
        }
    }
    if (!fileName) {
        return null;
    }

    return fileName;
}

function play(fileName) {
    if (!fileName) {
        return;
    }

    if (!keys.hasOwnProperty(fileName)) {
        keys[fileName] = new MediaPlayer('../media/' + fileName + '.mp3');
    }

    keys[fileName].start();
}


function stop(fileName) {
    if (!fileName) {
        return;
    }

    if (!keys.hasOwnProperty(fileName)) {
        keys[fileName] = new MediaPlayer('../media/' + fileName + '.mp3');
    }

    if (sustain.checked) {
        return;
    }

    keys[fileName].stop();
}

// Initialize a keyElement by setting its lsteners and adding it to keys object
function initializeKey(key) {
    var fileName = getElementFileName(key);
    if (!fileName) {
        console.error('Error finding elements file name');
    }
    key.id = fileName;
    keys[fileName] = null;

    key.addEventListener('mousedown', function (event) {
        // Prevent forbidden icon when dragging the mouse
        event.preventDefault();
        keyPressed.call(this, event);
    });

    key.addEventListener('touchstart', function (event) {
        event.preventDefault();
        keyPressed.call(this, event);
    });
}

// Set up the sustain element to listen for changes
sustain.addEventListener('change', function (event) {
    if (this.checked) return;
    var keysAttributes = Object.keys(keys);
    for (var i = 0; i < keysAttributes.length; i++) {
        keys[keysAttributes[i]].stop();
    }
});

// Initialize the sound selector for it to respond to click events
initializeSoundSelector();

// Initializing MediaPlayers for white keys and addding event listeners
Array.from(document.getElementsByClassName('white-key')).map(initializeKey);

// Initializing MediaPlayers for black keys and addding event listeners
Array.from(document.getElementsByClassName('black-key')).map(initializeKey);

initializeMedia('piano-sound');


// Initialize a KeyboardInputHandler and set up the key listeners
var keyboardInputHandler = new KeyboardInputHandler(keys, sustain);
document.addEventListener('keyup', keyboardInputHandler.keyUpListener.bind(keyboardInputHandler));
document.addEventListener('keydown', keyboardInputHandler.keyDownListener.bind(keyboardInputHandler));


// Adding event listener to the document so that piano keys can be released
// The document has to handle this event since keys must be released when the mouse is up no matter where
document.addEventListener('mouseup', function(event) {
    keyReleased.call(this, event);
});

document.addEventListener('touchend', function (event) {
    keyReleased.call(this, event);
});