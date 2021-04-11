// John Resig Micro-templating
// http://ejohn.org/blog/javascript-micro-templating/
(function () {
    var cache = {};
    this.tmpl = function tmpl(str, data) {
        var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + str.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return data ? fn(data) : fn;
    };
})();

// HELPERS --------------------

// https://stackoverflow.com/questions/1787939/check-time-difference-in-javascript
function timeDiff(datetime) {
    console.log(datetime.toString());
    console.log(new Date().toString());

    var datetime = datetime.getTime();
    var now = new Date().getTime();

    if (isNaN(datetime)) {
        return null;
    }

    var msDiff = datetime > now ? datetime - now : 0;
    var days = Math.floor(msDiff / 1000 / 60 / (60 * 24));
    var dateDiff = new Date(msDiff);

    return [days, dateDiff.getHours(), dateDiff.getMinutes(), dateDiff.getSeconds()];
}

function padLeft(nr, n, str) {
    return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

// THE TIME NOW ---------------
var clocks = []; // holds all the TTN clocks in the page

function CountdownClock(targetElement) {
    this.targetElement;
    this.fontColor;
    this.borderColor;
    this.backgroundColor;
    this.fontSize;

    this.endTime;
    this.days;
    this.hours;
    this.minutes;
    this.seconds;

    this.clock;
    this.tickInterval;
    this.isTicking = false;

    this.template = tmpl(
        '<div class="ttn-countdown-clock" style="background-color: <%= backgroundColor %> !important; border: 1px solid <%= borderColor %> !important; color: <%= fontColor %> !important; font-size: <%= fontSize %>px !important; font-family: Arial, sans-serif; !important">' +
        '<div class="ttn-countdown-clock-time">' +
        '<div class="ttn-countdown-clock-wrapper ttn-countdown-clock-days-wrapper">' +
        '<span class="ttn-countdown-clock-days"><%= days %></span>' +
        '<span class="ttn-countdown-clock-text">days</span>' +
        '</div>' +
        '<div class="ttn-countdown-clock-wrapper ttn-countdown-clock-hours-wrapper">' +
        '<span class="ttn-countdown-clock-hours"><%= hours %></span>' +
        '<span class="ttn-countdown-clock-text">hours</span>' +
        '</div>' +
        '<div class="ttn-countdown-clock-wrapper ttn-countdown-clock-minutes-wrapper">' +
        '<span class="ttn-countdown-clock-minutes"><%= minutes %></span>' +
        '<span class="ttn-countdown-clock-text">minutes</span>' +
        '</div>' +
        '<div class="ttn-countdown-clock-wrapper ttn-countdown-clock-seconds-wrapper">' +
        '<span class="ttn-countdown-clock-seconds"><%= seconds %></span>' +
        '<span class="ttn-countdown-clock-text">seconds</span>' +
        '</div>' +
        '</div>' +
        '<div class="ttn-countdown-clock-label">Countdown ends on <%= endTimeText %></div>' +
        '<div class="embed-clock-copyright" style="margin-top: 10px; background-color: white; padding: 2px; ">' +
        '</div>' +
        '</div>' +
        '<noscript>If the countdown is not showing, Javascript may be disabled. Please visit <a href="http://www.thetimenow.com/">www.thetimenow.com</a> for support.</noscript>'
    );

    this.init = function (targetElement) {
        this.targetElement = targetElement;

        this.updateSettings();
        this.render();
    };

    this.updateSettings = function () {
        this.fontColor = this.targetElement.dataset.fontColor;
        this.borderColor = this.targetElement.dataset.borderColor;
        this.backgroundColor = this.targetElement.dataset.backgroundColor;
        this.fontSize = this.targetElement.dataset.fontSize;
        this.endTime = this.targetElement.dataset.endTime;

        console.log(this.endTime);

        var endTimeParts = this.endTime.split(' ');
        var date = endTimeParts[0];
        var time = endTimeParts[1];

        var dateParts = date.split('-');
        var year = dateParts[0];
        var month = dateParts[1];
        var day = dateParts[2];

        var timeParts = time.split(':');
        var hour = timeParts[0];
        var minute = timeParts[1];
        var second = timeParts[2];

        console.log(year, parseInt(month), day, hour, minute, second, 0);

        this.endTime = new Date(year, parseInt(month) - 1, day, hour, minute, second, 0);

        var timeDiffParts = timeDiff(this.endTime);
        this.days = timeDiffParts[0];
        this.hours = timeDiffParts[1];
        this.minutes = timeDiffParts[2];
        this.seconds = timeDiffParts[3];
    };

    var thisClock = this;
    this.tick = function () {

        var days = thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-days")[0].innerHTML;
        var hours = thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-hours")[0].innerHTML;
        var minutes = thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-minutes")[0].innerHTML;
        var seconds = thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-seconds")[0].innerHTML;

        seconds = seconds > 0 ? seconds - 1 : seconds;
        if (seconds == 0) {
            seconds = 60;
            minutes = minutes > 0 ? minutes - 1 : minutes;
            if (minutes == 0) {
                minutes = 60;
                hours = hours > 0 ? hours - 1 : hours;
                if (hours == 0) {
                    hours = 23;
                    days = days > 0 ? days - 1 : days;
                    if (days == 0) {
                        clearInterval(thisClock.tickInterval);
                    }
                }
            }
        }

        thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-days")[0].innerHTML = padLeft(days, 2);
        thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-hours")[0].innerHTML = padLeft(hours, 2);
        thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-minutes")[0].innerHTML = padLeft(minutes, 2);
        thisClock.targetElement.getElementsByClassName("ttn-countdown-clock-seconds")[0].innerHTML = padLeft(seconds, 2);
    };

    this.render = function () {
        this.clock = this.template({
            fontColor: this.fontColor,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fontSize: this.fontSize,
            endTime: this.endTime,
            endTimeText: this.endTime.toString(),
            days: padLeft(this.days, 2),
            hours: padLeft(this.hours, 2),
            minutes: padLeft(this.minutes, 2),
            seconds: padLeft(this.seconds, 2),
            linkUrl: "http://www.javascriptclock.com/"
        });

        this.targetElement.innerHTML = this.clock;

        var thisClock = this;

        if (thisClock.isTicking) {
            thisClock.isTicking = false;
            clearInterval(thisClock.tickInterval);
        } else {
            thisClock.isTicking = true;
            thisClock.tickInterval = setInterval(thisClock.tick, 1000);
        }

    };

    this.init(targetElement);
}


function TimerClock(targetElement) {
    this.targetElement;
    this.fontColor;
    this.borderColor;
    this.backgroundColor;
    this.fontSize;
    this.tickInterval;

    this.clock;
    this.isTicking = false;

    this.template = tmpl(
        '<div class="ttn-timer-clock" style="background-color: <%= backgroundColor %> !important; border: 1px solid <%= borderColor %> !important; color: <%= fontColor %> !important; font-size: <%= fontSize %>px !important; font-family: Arial, sans-serif; !important">' +
        '<span class="ttn-timer-clock-hours">00</span>:<span class="ttn-timer-clock-minutes">00</span>:<span class="ttn-timer-clock-seconds">00</span>' +
        '<div class="ttn-timer-clock-btn">start</div> ' +
        '</div>' +
        '</div>'
    );

    this.init = function (targetElement) {
        this.targetElement = targetElement;

        this.updateSettings();
        this.render();
    };

    this.updateSettings = function () {
        this.fontColor = this.targetElement.dataset.fontColor;
        this.borderColor = this.targetElement.dataset.borderColor;
        this.backgroundColor = this.targetElement.dataset.backgroundColor;
        this.fontSize = this.targetElement.dataset.fontSize;
    };

    var thisClock = this;
    this.tick = function () {

        var hours = thisClock.targetElement.getElementsByClassName("ttn-timer-clock-hours")[0].innerHTML;
        var minutes = thisClock.targetElement.getElementsByClassName("ttn-timer-clock-minutes")[0].innerHTML;
        var seconds = thisClock.targetElement.getElementsByClassName("ttn-timer-clock-seconds")[0].innerHTML;

        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
                if (hours == 24) {
                    hours = 0;
                }
            }
        }

        thisClock.targetElement.getElementsByClassName("ttn-timer-clock-hours")[0].innerHTML = padLeft(hours, 2);
        thisClock.targetElement.getElementsByClassName("ttn-timer-clock-minutes")[0].innerHTML = padLeft(minutes, 2);
        thisClock.targetElement.getElementsByClassName("ttn-timer-clock-seconds")[0].innerHTML = padLeft(seconds, 2);
    };

    this.render = function () {
        this.clock = this.template({
            fontColor: this.fontColor,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fontSize: this.fontSize,
            date: this.date,
            linkUrl: "http://www.javascriptclock.com/"
        });

        this.targetElement.innerHTML = this.clock;

        var thisClock = this;
        this.targetElement.getElementsByClassName('ttn-timer-clock-btn')[0].addEventListener('click', function () {
            if (thisClock.isTicking) {
                thisClock.isTicking = false;
                this.innerHTML = 'start';
                this.classList.remove('active');
                clearInterval(thisClock.tickInterval);
            } else {
                thisClock.isTicking = true;
                this.innerHTML = 'stop';
                this.classList.toggle('active');
                thisClock.tickInterval = setInterval(thisClock.tick, 1000);
            }
        });
    };

    this.init(targetElement);
}

function ClockClock(targetElementIdx, hour, minute, second, date, text, url) {
    this.targetElement;
    this.fontColor;
    this.borderColor;
    this.backgroundColor;
    this.fontSize;
    this.tickInterval;

    this.hour;
    this.minute;
    this.second;
    this.date;

    this.text;
    this.url;

    this.clock;
    this.isTicking = false;

    this.template = tmpl(
        '<div class="ttn-thetimenow-clock nissan-title" style="background-color: <%= backgroundColor %>; border: 1px solid <%= borderColor %>; color: <%= fontColor %>; font-size: <%= fontSize %>px; font-family: Arial, sans-serif;">' +
        '<span class="ttn-thetimenow-clock-hours nissan-title"><%= hour %></span>:<span class="ttn-thetimenow-clock-minutes nissan-title"><%= minute %></span>:<span class="ttn-thetimenow-clock-seconds nissan-title"><%= second %></span>' +
        '</div>'
    );

    this.init = function (targetElementIdx, hour, minute, second, date, text, url) {
        var clockTags = document.getElementsByClassName('thetimenow-embeddable-clock');
        this.targetElement = clockTags[targetElementIdx];

        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.date = date;
        this.text = text;
        this.url = url;

        this.updateSettings();
        this.render();
    };

    this.updateSettings = function () {
        this.fontColor = this.targetElement.dataset.fontColor;
        this.borderColor = this.targetElement.dataset.borderColor;
        this.backgroundColor = this.targetElement.dataset.backgroundColor;
        this.fontSize = this.targetElement.dataset.fontSize;
    };

    function padLeft(nr, n, str) {
        return Array(n - String(nr).length + 1).join(str || '0') + nr;
    }

    var thisClock = this;
    this.tick = function () {

        var hours = thisClock.targetElement.getElementsByClassName("ttn-thetimenow-clock-hours")[0].innerHTML;
        var minutes = thisClock.targetElement.getElementsByClassName("ttn-thetimenow-clock-minutes")[0].innerHTML;
        var seconds = thisClock.targetElement.getElementsByClassName("ttn-thetimenow-clock-seconds")[0].innerHTML;

        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
                if (hours == 24) {
                    hours = 0;
                }
            }
        }

        thisClock.targetElement.getElementsByClassName("ttn-thetimenow-clock-hours")[0].innerHTML = padLeft(hours, 2);
        thisClock.targetElement.getElementsByClassName("ttn-thetimenow-clock-minutes")[0].innerHTML = padLeft(minutes, 2);
        thisClock.targetElement.getElementsByClassName("ttn-thetimenow-clock-seconds")[0].innerHTML = padLeft(seconds, 2);
    };

    this.render = function () {
        this.clock = this.template({
            fontColor: this.fontColor,
            borderColor: this.borderColor,
            backgroundColor: this.backgroundColor,
            fontSize: this.fontSize,
            hour: padLeft(this.hour, 2),
            minute: padLeft(this.minute, 2),
            second: padLeft(this.second, 2),
            date: this.date,
            linkText: this.text,
            linkUrl: this.url
        });

        this.targetElement.innerHTML = this.clock;

        this.tickInterval = setInterval(this.tick, 1000);
    };

    this.init(targetElementIdx, hour, minute, second, date, text, url);
}


// Helpers
function doJsonpRequest(params, callback) {
    // construct query string from params
    var queryParams = [];
    for (var param in params) {
        if (params.hasOwnProperty(param)) {
            queryParams.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]));
        }
    }
    queryString = queryParams.join("&");

    // construct URL
    url = 'http://www.thetimenow.com/ttn-embed-js.php?' + queryString + '&callback=' + callback;

    var head = document.head;
    var script = document.createElement("script");

    script.setAttribute("src", url);
    head.appendChild(script);
    head.removeChild(script);
};

function createclock(clockData) {
    var clock = new ClockClock(clockData.tagIdx, clockData.hour, clockData.minute, clockData.second, clockData.date, clockData.text, clockData.url);
    clocks.push(clock);
}

function theTimeNowRenderClocks() {
    // make sure all intervals are stopped
    for (var i = 0; i < clocks.length; i++) {
        clearInterval(clocks[i].tickInterval);
    }

    // render the clocks
    var clockTags = document.getElementsByClassName('thetimenow-embeddable-clock');
    for (var i = 0; i < clockTags.length; i++) {
        var clockTag = clockTags[i];
        var clockType = clockTag.dataset.type;
        switch (clockType) {
            case 'timer':
                if (clockTag.firstChild) {
                    clocks.push(new TimerClock(clockTag));
                } else {
                    clockTag.innerHTML = 'MISSING ATTRIBUTION LINK';
                }
                break;

            case 'countdown':
                //if ( clockTag.firstChild ) {
                clocks.push(new CountdownClock(clockTag));
                //}
                //else {
                //  clockTag.innerHTML = 'MISSING ATTRIBUTION LINK';
                //}
                break;

            case 'clock':
                if (clockTag.firstChild) {
                    doJsonpRequest({
                        tag_idx: i,
                        location_type: clockTag.dataset.locationType ? clockTag.dataset.locationType : "",
                        location_id: clockTag.dataset.locationId ? clockTag.dataset.locationId : 0
                    }, 'createclock');
                } else {
                    clockTag.innerHTML = 'MISSING ATTRIBUTION LINK';
                }
                break;
        }
    }
}

// START

(function () {
    // Inject CSS
    var styleTag = document.createElement('link');
    styleTag.setAttribute("type", 'text/css');
    styleTag.setAttribute("rel", 'stylesheet');
    styleTag.setAttribute("href", 'http://www.thetimenow.com/min/css/ttn-embed.css');
    document.head.appendChild(styleTag);

    theTimeNowRenderClocks();
})();
