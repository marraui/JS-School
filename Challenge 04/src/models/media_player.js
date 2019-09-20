// Class in charge of handling the audio elements
function MediaPlayer(src) {
    this.src = src; // The path to the mp3 file

    this.element = document.createElement('audio'); // Audio element
    this.element.setAttribute('src', this.src); // Add source attribute to the element
    this.element.setAttribute('hidden', "true"); // Set attribute hidden so that it isn't displayed
    document.body.appendChild(this.element); // Add element to the body

    this.element.volume = 1; // Initialize at max volume
}

// Stop Playing audio
MediaPlayer.prototype.stop = function () {
    if (this.element.paused) return; // If the element is paused there's not need to stop
    
    // Instead of immediately stopping the audio element we diminish the volume all the way to 0
    // In the span of less than a second to simulate the piano keys that keep ringing for a short time
    // Even after the playing has stopped
    this.interval = setInterval(this.lowerVolume.bind(this), 5);
}

// Start playing audio
MediaPlayer.prototype.start = function () {
    // There's a chance the audio is midway through diminishing
    // In that case we have to clear the interval, pause the audio, set the time to 0,
    // Set the time to 0, and finally play
    clearInterval(this.interval);
    this.element.pause();
    this.element.currentTime = 0;
    this.element.volume = 1;
    this.element.play();
}

// Diminish the volume all the way down to 0
MediaPlayer.prototype.lowerVolume = function (amount=0.02) {
    // Diminish the volume by a certain amount and make sure it's not below 0
    this.element.volume = Math.max(0, this.element.volume - amount);;
    
    if (this.element.volume == 0) {
        // Once volume is 0 clear the interval and reset everything
        // In order for it to be ready to start playing again
        clearInterval(this.interval);
        this.element.pause();
        this.element.currentTime = 0;
        this.element.volume = 1;
    }
}