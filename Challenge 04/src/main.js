var keys = {};
var keysPressed = new Set();
var sustain = document.getElementById('sustain');
var soundSelector = document.getElementById('sound-select');

soundSelector.addEventListener('change', function (event) {
    initializeMedia(this.value);
});

sustain.addEventListener('change', function (event) {
    console.log('sustain changed');
    if (this.checked) return;
    var keysAttributes = Object.keys(keys);
    for (var i = 0; i < keysAttributes.length; i++) {
        console.log(`Stopping ${keysAttributes[i]} because of sustain`);
        keys[keysAttributes[i]].stop();
    }
});

function keyPressed(event) {
    console.log('keyPressed');

    // Add key to the keysPressed set
    keysPressed.add(this.id);

    // Change appearance when pressed
    if(this.classList.contains('black-key')) this.classList.add('black-key-pressed');
    else this.classList.add('white-key-pressed');
    play(this.id);
}

function keyReleased(event) {
    console.log('keyReleased');
    console.log(keysPressed);
    keysPressed.forEach(function (key) {
        var keyElement = document.getElementById(key);
        if (!sustain.checked) {
            console.log(`Stoppping ${key}`);
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
        // console.log(`Octave for element ${element} couldn't be found`);
        return null;
    }
    octaveNumber = octaveNumber[0];

    var fileName;
    for (var j = 0; j < element.classList.length; j++) {
        var className = element.classList.item(j);
        var regRes = className.match(/[A-G]/);
        if (regRes != null) {
            // console.log(`className: ${className}, type: ${typeof className}`)
            fileName = className.slice(0, 1) + octaveNumber + className.slice(1);
            break;
        }
    }
    if (!fileName) {
        // console.log(`Octave for element ${element} couldn't be found`);
        return null;
    }

    // console.log(`file name found: ${fileName}`);
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


// Initializing MediaPlayers for white keys and addding event listeners
var element = document.getElementsByClassName('white-key');
for (var i = 0; i < element.length; i++) {
    var fileName = getElementFileName(element.item(i));
    if (!fileName) {
        console.error('Error finding elements file name');
    }
    element.item(i).id = fileName;
    keys[fileName] = new MediaPlayer(`../media/${soundSelector.value}/${element.item(i).id}.mp3`);

    element.item(i).addEventListener('mousedown', function (event) {
        // Prevent forbidden icon when dragging the mouse
        event.preventDefault();
        keyPressed.call(this, event);
    });

    element.item(i).addEventListener('touchstart', function (event) {
        console.log('touchstart');
        event.preventDefault();
        keyPressed.call(this, event);
    });
}

// Initializing MediaPlayers for black keys and addding event listeners
element = document.getElementsByClassName('black-key');
for (var i = 0; i < element.length; i++) {
    var fileName = getElementFileName(element.item(i));
    if (!fileName) {
        console.error('Error finding elements file name');
    }
    element.item(i).id = fileName;
    keys[fileName] = new MediaPlayer(`../media/${soundSelector.value}/${element.item(i).id}.mp3`);

    element.item(i).addEventListener('mousedown', function (event) {
        // Prevent forbidden icon when dragging the mouse
        event.preventDefault();
        keyPressed.call(this, event);
    });

    element.item(i).addEventListener('touchstart', function (event) {
        console.log('touchstart');
        event.preventDefault();
        keyPressed.call(this, event);
    });
}

// Adding event listener to the document so that keys can be released
// The document has to handle this event since keys must be released when the mouse is up no matter where
document.addEventListener('mouseup', function(event) {
    keyReleased.call(this, event);
});


var keyboardInputHandler = new KeyboardInputHandler(keys, sustain);
document.addEventListener('keyup', keyboardInputHandler.keyUpListener.bind(keyboardInputHandler));
document.addEventListener('keydown', keyboardInputHandler.keyDownListener.bind(keyboardInputHandler));

document.addEventListener('touchend', function (event) {
    console.log('touchend');
    //event.preventDefault();
    keyReleased.call(this, event);
});