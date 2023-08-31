// <------------ CLOCK ------------>

// returns a formated time for the clock
const time = () => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes();
    return time;
};

// adds the clock first before the interval so there is no delay in rendering
document.getElementById("clock-text").innerHTML = time();

// automatically updates the time every 1 sec
setInterval(function () {
    document.getElementById("clock-text").innerHTML = time();
}, 1000);

// <------------ GREETING ------------>

// retrieves the messages stored in chrome, if there is none, default is '(name)'

// if storage is empty
let message = "Hello, (name)";

// if storage is not emplty




// displays the message
document.getElementById("greeting-text").innerHTML = message;

// user is able to edit the message

