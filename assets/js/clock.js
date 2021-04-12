function clock() {
    var hours = document.getElementById("hour")
    var minutes = document.getElementById("minutes")
    var seconds = document.getElementById("seconds")

    var hourNow = new Date().getHours();
    var minutesNow = new Date().getMinutes();
    var secondsNow = new Date().getSeconds();

    hours.innerHTML = hourNow < 10 ? `0${hourNow}` : hourNow;
    minutes.innerHTML = minutesNow < 10 ? `0${minutesNow}` : minutesNow;
    seconds.innerHTML = secondsNow < 10 ? `0${secondsNow}` : secondsNow;
}

setInterval(clock, 1000);
