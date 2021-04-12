function clock() {
    var hours = document.getElementById("hour")
    var minutes = document.getElementById("minutes")
    var seconds = document.getElementById("seconds")

    var hourNow = new Date().getHours();
    var minutesNow = new Date().getMinutes();
    var secondsNow = new Date().getSeconds();

    hours.innerHTML = hourNow;
    minutes.innerHTML = minutesNow;
    seconds.innerHTML = secondsNow;
}

setInterval(clock, 1000);
