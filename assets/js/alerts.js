function nowIsBetween(min, max) {
    var minSplit = min.split(':');
    var maxSplit = max.split(':');

    let minHours = parseInt(minSplit[0]);
    let minMinutes = parseInt(minSplit[1]);
    let maxHours = parseInt(maxSplit[0]);
    let maxMinutes = parseInt(maxSplit[1]);

    let minTotalMinutes = minHours * 60 + minMinutes;
    let maxTotalMinutes = maxHours * 60 + maxMinutes;

    let now = new Date();
    let nowTotalMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
    if (minHours > 12 || maxHours > 12) {
        if (now.getUTCHours() < 12) {
            nowTotalMinutes += 24 * 60 + 60;
        }
    }

    if (maxTotalMinutes < minTotalMinutes) maxTotalMinutes += 24 * 60 + 60;

    return nowTotalMinutes >= minTotalMinutes && nowTotalMinutes <= maxTotalMinutes;
}

if (nowIsBetween("01:50", "03:30")) {
    let alert = document.getElementById("lobby-alert");
    alert.classList.remove("d-none");
}
