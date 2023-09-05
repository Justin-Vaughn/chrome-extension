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



