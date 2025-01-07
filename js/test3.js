document.addEventListener("DOMContentLoaded", function () {
  const circles = document.querySelectorAll(".temamenu a");
  const temaer = document.querySelectorAll(".temaer > div");

  const screen = document.querySelector(".screen");

  const tema4 = document.querySelector(".tema4");

  /* KLON HTML */
  const originalScreenHTML = screen.outerHTML;

  function hideAllTemas() {
    temaer.forEach((tema) => tema.classList.remove("active"));
  }

  function removeGameFromDOM() {
    stopAllSound();

    const existingScreen = document.querySelector(".screen");
    if (existingScreen) {
      existingScreen.remove();
    }
  }

  function recreateGame() {
    const parentElement = document.querySelector(".temaer");

    parentElement.insertAdjacentHTML("afterbegin", originalScreenHTML);

    start();
  }

  circles.forEach((circle, index) => {
    circle.addEventListener("click", (e) => {
      e.preventDefault();

      removeGameFromDOM();

      hideAllTemas();

      if (index === 3) {
        recreateGame();
      } else {
        temaer[index].classList.add("active");
      }
    });
  });

  let points;

  /* Lyde */

  const clothSound = document.querySelector("#lyd1");
  const bgSound = document.querySelector("#lyd2");
  const muteBtn = document.querySelector("#mute");

  /* STARTER SPIL */

  function start() {
    console.log("start");

    hideAllScreens();

    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#start_btn").addEventListener("click", startGame);
  }

  // /* SPIL START */

  function startGame() {
    console.log("start game");

    document.querySelector("#start").classList.add("hide");
    document.querySelector("#game").classList.remove("hide");

    points = 0;

    end = false;

    updateUI();

    stopAllSound();

    bgSound.currentTime = 0;
    bgSound.play();
    bgSound.addEventListener("ended", loopSound);
    muteBtn.addEventListener("click", muteplay);

    let randomNumber = generateRandomNumber(4);

    console.log(randomNumber);

    let newPos = "pos" + randomNumber;

    console.log(newPos);
    document.querySelector("#cloth_container").classList.add(newPos);
    document.querySelector("#cloth_container").classList.add("fald");

    randomNumber = generateRandomNumber(4);
    let newDelay = "delay" + randomNumber;
    document.querySelector("#cloth_container").classList.add(newDelay);

    document
      .querySelector("#cloth_container")
      .addEventListener("mousedown", clickCloth);

    document
      .querySelector("#cloth_container")
      .addEventListener("animationiteration", restartCloth);
  }

  function clickCloth() {
    console.log("clickCloth");

    clothSound.currentTime = 0;
    clothSound.play();
    this.removeEventListener("mousedown", clickCloth);
    addPoint();
    updateUI();
    this.classList.add("frys");
    this.firstElementChild.classList.add("forsvind");

    if (points < 3) {
      this.addEventListener("animationend", restartCloth);
    } else {
      stopAllAnimations();
      winGame();
    }
  }

  function restartCloth() {
    console.log("restartCloth");
    this.classList = "";
    this.firstElementChild.classList = "";

    this.offsetHeight;

    let randomNumber = generateRandomNumber(4);
    let newPos = "pos" + randomNumber;
    this.classList.add(newPos);

    this.classList.add("fald");

    this.addEventListener("mousedown", clickCloth);
  }

  function winGame() {
    console.log("winGame");
    stopAllSound();
    document.querySelector("#game").classList.add("hide");
    document.querySelector("#cloth_container").classList.add("hide");
    document.querySelector("#win").classList.remove("hide");
    document.querySelector("#next_btn").addEventListener("click", loadSpil);
  }

  function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  function updateUI() {
    document.querySelector("#score").textContent = points;
  }

  function addPoint() {
    points = points + 1;
  }

  function hideAllScreens() {
    document.querySelector("#start").classList.add("hide");
    document.querySelector("#win").classList.add("hide");
  }

  function stopAllSound() {
    bgSound.pause();
    clothSound.pause();
  }

  function muteplay() {
    console.log("muteplay");
    if (bgSound.paused === true) {
      bgSound.play();
    } else {
      bgSound.pause();
    }
  }

  function loopSound() {
    console.log("loopSound");
    bgSound.play();
  }

  function loadSpil() {
    hideAllScreens();
    document.querySelector("#game").classList.add("hide");
    document.querySelector(".tema4").classList.add("active");
  }

  function stopAllAnimations() {
    document.querySelector("#cloth_container").classList = 0;
    document.querySelector("#cloth_sprite").classList = 0;

    document
      .querySelector("#cloth_container")
      .removeEventListener("mousedown", clickCloth);
    document
      .querySelector("#cloth_container")
      .removeEventListener("animationiteration", restartCloth);
  }
});
