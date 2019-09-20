# Challenge 04

The challenge to make a web piano using html css and vanilla javascript.

The piano can be played using a touchscreen, mouse, or keyboard. This is done using listener for touch, mouse, and key events.

There's a sustain switch that acts like the sustain pedal in real keyboards. While it's activated a key will keep ringing even after being released, where as if it's deactivated keys will stop ringing immediately after being released.

There's also a sound selector, where you can change how the piano sounds. Piano and Drums are the only sounds available at the moment.

## Controls
The keys can be pressed using the keyboard. each piano key corresponds to the following keyboard inputs in order from left to right.

Z, S, X, D, C, V, G, B, H, N, J, M, Q, 2, W, 3, E, R, 5, T, 6, Y, 7, U

Also the sustain can be activated by pressing the spacebar and deactivaded by releasing it.

## How to run
Clone the repository and open the index.html file inside Challenge04/src with a browser.

## How it works

### Layout
The piano can have as many octaves as necessary. This is thanks to the way the layout is structured. there's a "keys" div that wraps all of the piano keys that are going to be displayed. Inside it there can be <b>as many</b> octaves as you want, all that is needed is add a div with the class "octave-{octave_number}". Inside each octave there should be a div with the class "black-keys" and a div with the class "white-keys". Inside either of these divs there are a div for each of the keys, with the class being "{note}{-sharp (only if sharp)}" eg: C, D-sharp. This allows the developer to just copy and paste an octave div and just change the class and there will be 12 new notes displayed on the piano, this also allows for easier adding of new sound types which will be described in the following segment.

### JavaScript

All the mp3 sounds organized inside the media folder. Inside the media folder there must be a folder with the name of the type of sounds (in this case there's a folder piano and a folder drums). Inside each sound type's folder are stored the mp3 files for each of the sounds played when a piano key is pressed. The mp3 files follow a format that is as follows {note in american notation}{octave}{-sharp (only if sharp)} eg: C4, D5-sharp.

This format, coupled with the structure of classes in the layout. allows the accessing of the mp3 files through javascript without hard coding it, and allows the developer to add new sound types just by add a new folder to media, and adding the option to the select element inside index.html