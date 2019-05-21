setInterval(function() {
    makeTimer();
}, 1000);

function makeTimer() {

    var endTime = new Date("Jun 14, 2019 12:00:00 PDT");
    var endTime = (Date.parse(endTime)) / 1000;

    var now = new Date();
    var now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;

    var days = Math.floor(timeLeft / 86400);
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (days < "0") {
        days = "0";
    }

    if (hours < "10") {
        hours = "0" + hours;
    }
    if (minutes < "10") {
        minutes = "0" + minutes;
    }
    if (seconds < "10") {
        seconds = "0" + seconds;
    }

    $("#days").html(days + "<span>  天</span>");
    $("#hours").html(hours + "<span> 時</span>");
    $("#minutes").html(minutes + "<span> 分</span>");
    $("#seconds").html(seconds + "<span> 秒</span>");

}