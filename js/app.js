/**
 * Created by iMax on 11.07.16.
 */

var time = 0;
var interval;
var atStartPoint;
var isRunning = false;
var timerOutput = document.getElementById("timerOutput");
var playPauseButton = document.getElementById("button-play");

function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var hours = time.getHours() - 2;                    //SOMEHOW HOURS START FROM 2. WHY???
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var millisec = time.getMilliseconds().toString();   //NUMBER DIDN'T WORK ON 00 AND 01

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    while (millisec.length < 3) {                       //if (millisec < 100) STATEMENT DIDN'T WORK PROPERLY
        millisec = "0" + millisec;
    }

    return hours + ":" + minutes + ":" + seconds + "." + millisec;
}

function update() {
    time += delta();
    var formattedTime = timeFormatter(time);
    timerOutput.innerHTML = formattedTime;
}
function delta() {
    var now = Date.now();
    var timePassed = now - atStartPoint;
    atStartPoint = now;
    return timePassed;
}

//Start timer

var startStop = function () {
    if (!isRunning) {
        //Start timer
        atStartPoint = Date.now();
        interval = setInterval(update, 50);
        //Change the icon to Pause
        playPauseButton.innerHTML = "<i class=\"icon-pause\"></i>";
        isRunning = true;
    }
    else {
        // Put the timer on hold
        clearInterval(interval);
        interval = null;
        //Change the icon back to Play
        playPauseButton.innerHTML = "<i class=\"icon-play\"></i>";
        isRunning = false;
    }

}

//Reset timer

var resetTimer = document.getElementById("button-stop");

var reset = function () {
    //Reset timer to initial state
    time = 0;
    timerOutput.innerHTML = "00:00:00.000";
    //Change the icon back to Play
    playPauseButton.innerHTML = "<i class=\"icon-play\"></i>";
    isRunning = false;
}

playPauseButton.onclick = startStop;

resetTimer.onclick = reset;



