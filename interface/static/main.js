let debug = true;
let aimed = false;
let timerNumber = 101;

function o(value) {
  if (debug) console.log(value);
}

(() => {
  o("app loaded");

  // start timer, update each second
  let timer = document.getElementById("timer_number");
  let timerUpdate = setInterval(() => {
    timerNumber -= 1;
    timer.innerHTML = timerNumber;
    if (timerNumber <= 0) {
      clearInterval(timerUpdate);
      // change app state
    }
  }, 1000);

  // get crosshair for showing cursor position
  let crosshair = document.getElementById("crosshair");

  // get location/area of other player
  let player = document.getElementById("player");

  // get mouse position on move over document
  document.body.addEventListener("mousemove", e => {
    let x = e.clientX / document.body.clientWidth;
    let y = e.clientY / document.body.clientHeight;

    // set crosshair position to mouse position
    crosshair.style.top = y * 100 + "vh";
    crosshair.style.left = x * 100 + "vw";

    // document.body.style.cursor = "none";

    let ppos = player.getBoundingClientRect();

    let topLimit = ppos.top / document.body.clientHeight; // y greater than
    let bottomLimit = ppos.bottom / document.body.clientHeight; // y less than
    let leftLimit = ppos.left / document.body.clientWidth; // x greater than
    let rightLimit = ppos.right / document.body.clientWidth; // x less than

    // change color of crosshair when over other player area

    if (
      y >= topLimit &&
      y <= bottomLimit &&
      x >= leftLimit &&
      x <= rightLimit
    ) {
      crosshair.style.borderColor = "#FF0000";
      aimed = true;
    } else {
      crosshair.style.borderColor = "";
      aimed = false;
    }
  });

  // make sure the textarea is always focus
  let textarea = document.getElementById("text_input");
  setTimeout(() => {
    textarea.focus();
  }, 0);

  document.addEventListener("mousedown", e => {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      textarea.focus();
    }, 0);
  });
})();
