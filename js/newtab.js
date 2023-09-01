// <------------ CLOCK ------------>

// returns a formated time for the clock
const time = (showSeconds = false) => {
    const date = new Date();
    const time = date.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });
    const timeSeconds = date.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return showSeconds ? timeSeconds : time;
};

// FUTURE add date under the time
// Etc: Monday, June 5th
const date = () => {
    const date = new Date();
    const day = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    return day;
};

// adds the clock first before the interval so there is no delay in rendering
document.getElementById("clock-text").innerHTML = time();
document.getElementById("clock-text-seconds").innerHTML = time(true);
document.getElementById("date-text").innerHTML = date();

// automatically updates the time every 1 sec
setInterval(function () {
    document.getElementById("clock-text").innerHTML = time();
    document.getElementById("clock-text-seconds").innerHTML = time(true);
    document.getElementById("date-text").innerHTML = date();
}, 1000);

// <------------ GREETING ------------>

// retrieves the messages stored in chrome, if there is none, default is '(name)'

// if storage is empty
let message = "Hello, (name)";

// if storage is not emplty

// displays the message
document.getElementById("greeting-text").innerHTML = message;

// user is able to edit the message
