const time = () => {
    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes();
    return time;
};

// adds the clock first before the interval so there is no delay in rendering
document.getElementById("clock-text").innerHTML = time();

// automatically updates the time every 1 sec
setInterval(function() {
    document.getElementById("clock-text").innerHTML = time();
  }, 1000);