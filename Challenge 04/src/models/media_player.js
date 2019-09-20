function MediaPlayer(src) {
    this.src = src;
    this.element = document.createElement('audio');
    this.finish = false;
    this.element.setAttribute('src', this.src);
    this.element.setAttribute('hidden', "true");
    document.body.appendChild(this.element);
    this.element.volume = 1;
}

MediaPlayer.prototype.stop = function () {
    if (this.element.paused) return;
    this.interval = setInterval(this.lowerVolume.bind(this), 5);
}

MediaPlayer.prototype.start = function () {
    clearInterval(this.interval);
    this.element.pause();
    this.element.currentTime = 0;
    this.element.volume = 1;
    this.element.play();
}

MediaPlayer.prototype.lowerVolume = function (amount=0.02) {
    this.element.volume = Math.max(0, this.element.volume - amount);;
    if (this.element.volume == 0) {
        clearInterval(this.interval);
        this.element.pause();
        this.element.currentTime = 0;
        this.element.volume = 1;
    }
}