function formatTime(seconds) {
    var realSeconds;
    var minutes;
    var hours;
    hours = Math.floor(seconds / 360) + '';
    minutes = Math.floor((seconds % 360) / 60) + '';
    realSeconds = (seconds % 360) % 60 + '';
    hours = hours.length > 1 ? hours : '0' + hours;
    minutes = minutes.length > 1 ? minutes : '0' + minutes;
    realSeconds = realSeconds.length > 1 ? realSeconds : '0' + realSeconds;
    return hours + ':' + minutes + ':' + realSeconds;
}

function countDown(i) {
    var interval = setInterval(function () {
        console.clear();
        console.log(formatTime(i));
        i-- || clearInterval(interval);  //if i is 0, then stop the interval
    }, 1000);
}

countDown(300);