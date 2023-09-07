// <------------ CLOCK ------------>

// returns a formated time for the clock
const time = (showSeconds = false) => {
    const date = new Date();
    const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const timeSeconds = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    // removes AM & PM from the time
    return showSeconds
        ? timeSeconds.replace(/\s*AM\s*|\s*PM\s*/g, "")
        : time.replace(/\s*AM\s*|\s*PM\s*/g, "");
};

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
let nameOfUser = "";

// if the storage is not empty
var message = "(name)";

chrome.storage.local.get("greeting").then((result) => {
    nameOfUser = result.greeting;
    console.log("Greeting value is " + result.greeting);

    if (nameOfUser != undefined) {
        // if storage is not emplty
        message = nameOfUser;
    }

    // displays the message
    document.getElementById("greeting-text-editable").innerHTML = message;
});

// user is able to edit the message
// taken from https://stackoverflow.com/questions/48977986/editing-form-by-double-clicking-element

document.querySelectorAll("#greeting-text-editable").forEach(function (node) {
    node.ondblclick = function () {
        let val = this.innerHTML;
        let input = document.createElement("input");
        input.value = val;
        input.onblur = function () {
            let val = this.value;

            // sets the value in chome's storage
            chrome.storage.local.set({ greeting: this.value }).then(() => {
                console.log(
                    "Greeting value added to chrome's storage: " + this.value
                );
            });

            this.parentNode.innerHTML = val;
        };

        this.innerHTML = "";
        this.appendChild(input);
        input.focus();
    };
});

// <------------ QUOTE ------------>

// awaits for url response and puts the quote on the page
async function getQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const quote = await response.json();

    console.log("Quote: " + quote["content"]);

    document.getElementById("quote-text").innerHTML = quote["content"];
}

getQuote();

// <------------ MENU BUTTON ------------>
const menu_buttons = document.getElementById("menu");
const quote_button = document.getElementById("quote-button");
const timer_button = document.getElementById("timer-button");
const menu_plus_sign = document.getElementById("add-button");

// opens and closed the menu
menu_buttons.onclick = () => {
    let quote_visibility = quote_button.style.visibility;
    let timer_visibility = timer_button.style.visibility;

    // logic to check if the menu is open or closed
    const menuIsOpen =
        quote_visibility == "visible" && timer_visibility == "visible";

    if (!menuIsOpen) {
        // spin the '+' sign to 'x'
        menu_plus_sign.style.transition = "1s";
        menu_plus_sign.style.transform = "rotateZ(135deg)";

        // shows the menu if it is hidden
        quote_button.style.visibility = "visible";
        timer_button.style.visibility = "visible";
    } else {
        // spin the 'x' sign to '+'
        menu_plus_sign.style.transition = "1s";
        menu_plus_sign.style.transform = "rotateZ(0deg)";

        // hides the menu if it is shown
        quote_button.style.visibility = "hidden";
        timer_button.style.visibility = "hidden";
    }
};

// TODO add the option to chrome storage
quote_button.onclick = () => {
    // selects the quote and finds if it is hidden
    let quote = document.getElementById("quote-text");
    const quoteIsShown = quote.style.visibility == "visible";

    if (!quoteIsShown) {
        // shows the quote if it is hidden
        quote.style.visibility = "visible";
        quote_button.style.border = "#333333 solid 0.1em";
    } else {
        // hides the quote if it is shown
        quote.style.visibility = "hidden";
        quote_button.style.border = "transparent solid 0.1em";
    }
};

// TODO add the option to chrome storage
timer_button.onclick = () => {
    // selects the timer and finds if it is hidden
    let timer = document.getElementById("timer");
    let start_pause_button = document.getElementById("play_button");
    let restart_button = document.getElementById("replay_button");

    const timerIsShown = timer.style.visibility == "visible";

    console.log("Clicked timer!");

    if (!timerIsShown) {
        // shows the timer if it is hidden
        timer.style.visibility = "visible";
        start_pause_button.style.visibility = "visible";
        restart_button.style.visibility = "visible";

        timer_button.style.border = "#333333 solid 0.1em";
    } else {
        // hides the timer if it is shown
        timer.style.visibility = "hidden";
        start_pause_button.style.visibility = "hidden";
        restart_button.style.visibility = "hidden";

        timer_button.style.border = "transparent solid 0.1em";
    }
};

// <------------ TIMER ------------>
// Inspired by https://stackoverflow.com/questions/56225643/how-to-make-a-pause-play-button-for-timer-on-javascript

const start_pause_timer_button = document.getElementById("play_button");
const restart_timer_button = document.getElementById("replay_button");
const timer_display = document.getElementById("timer-text");

// keeps track of the number of seconds remaining, starts with 25 minutes
let totalMinutes = 25;
let totalSeconds = totalMinutes * 60;
let timer; // holds the interval for the timer

// toggles the start button -> pause button
start_pause_timer_button.onclick = () => {
    const isPaused = start_pause_timer_button.innerText != "play_arrow";

    if (!isPaused) {
        // removes the restart button until it is paused
        restart_timer_button.style.visibility = "hidden";

        // sets the button to pause
        start_pause_timer_button.textContent = "pause";
        start_pause_timer_button.style.backgroundColor =
            "rgba(249, 231, 28, 0.926)";

        // start timer button
        startTimer();
    } else {
        // adds back the restart timer
        restart_timer_button.style.visibility = "visible";

        // sets the button to start
        start_pause_timer_button.textContent = "play_arrow";
        start_pause_timer_button.style.backgroundColor =
            "rgba(75, 217, 35, 0.798)";

        // pause timer button
        pauseTimer();
    }
};

restart_timer_button.onclick = () => {
    console.log("Restarting timer.");

    // pauses timer and restarts it at the given interval
    pauseTimer();
    totalSeconds = totalMinutes * 60;
    timer_display.textContent = timeFormat();
};

// calc minutes
const getMinutes = (totalSeconds) => {
    return Math.floor(totalSeconds / 60);
};

// calc secs
const getSeconds = (totalSeconds) => {
    let sec = totalSeconds % 60;
    return sec < 10 ? "0" + sec : sec;
};

// converts the time format
const timeFormat = () => {
    return getMinutes(totalSeconds) + ":" + getSeconds(totalSeconds);
};

// starts the timer
const startTimer = () => {
    timer_display.textContent = timeFormat();
    timer = setInterval(tick, 1000);
};

// implements the live ticking on the clock
const tick = () => {
    if (totalSeconds > 0) {
        totalSeconds--; // Decreases total seconds by one
        timer_display.textContent = timeFormat(); // Updates display
    } else {
        // The timer has reached zero. Let the user start again.
        timer_display.textContent = "DONE";
    }
};

// pauses the timer by ending the interval
const pauseTimer = () => {
    // Stops calling `tick`
    clearInterval(timer);
};

// sets the display value
timer_display.textContent = timeFormat();
