let placeholder = "Anything you write here will vanish...";
let lastCall;
let voidDelay = 2000; // seconds

function onInput(e) {
  let start;
  function step(timestamp) {
    if (start === undefined) {
      start = timestamp;
      lastCall = start;
    }
    if (start < lastCall) {
      return;
    }
    const elapsed = timestamp - start;
    if (elapsed < voidDelay) {
      window.requestAnimationFrame(step);
    } else {
      e.target.readOnly = true;
      e.target.classList.add("fade");
    }
  }
  window.requestAnimationFrame(step);
}

function onTransitionFinished(e) {
  e.target.classList.add("notransition");
  e.target.removeEventListener("input", onInput);

  e.target.classList.remove("fade");
  e.target.offsetHeight;
  e.target.value = "";

  e.target.classList.remove("notransition");
  e.target.addEventListener("input", onInput);
  e.target.readOnly = false;

  if (e.target !== document.activeElement) {
    e.target.placeholder = placeholder;
  }
}

function onFocus(e) {
  e.target.placeholder = "";
}

function onBlur(e) {
  if (e.target.value === "") {
    e.target.placeholder = placeholder;
  }
}

let textbox = document.getElementById("textInput");
textbox.addEventListener("input", onInput);
textbox.addEventListener("transitionend", onTransitionFinished);
textbox.addEventListener("focus", onFocus);
textbox.addEventListener("blur", onBlur);

let mailLink = document.getElementById("mailLink");
mailLink.href = "mail" + "to" + ":" + "bewe" + "@" + "mailbox.org";
