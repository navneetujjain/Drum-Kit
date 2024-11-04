var classButton = document.querySelectorAll(".drum").length;

let pressedKeys = {};
let soundIntervals = {};

for (var i = 0; i < classButton; i++) {
  var drumButton = document.querySelectorAll(".drum")[i];
  
  drumButton.addEventListener('click', function () {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });

  drumButton.addEventListener('mouseover', function () {
    this.classList.add("shadow");
  });

  drumButton.addEventListener('mouseout', function () {
    this.classList.remove("shadow");
  });
}

document.addEventListener("keydown", function(event) {
  const key = event.key.toLowerCase();

  if (!pressedKeys[key]) {
    pressedKeys[key] = true;  
    makeSound(key);          
    buttonAnimation(key);     

    soundIntervals[key] = setInterval(function() {
      makeSound(key);
    }, 100);
  }
});

document.addEventListener("keyup", function(event) {
  const key = event.key.toLowerCase();
  pressedKeys[key] = false; 
  
  clearInterval(soundIntervals[key]);
  delete soundIntervals[key]; 
});


function makeSound(key) {
  let audio;

  switch (key) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      break;
    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      break;
    case "s":
      audio = new Audio('sounds/tom-3.mp3');
      break;
    case "d":
      audio = new Audio('sounds/tom-4.mp3');
      break;
    case "j":
      audio = new Audio('sounds/kick-bass.mp3');
      break;
    case "k":
      audio = new Audio('sounds/snare.mp3');
      break;
    case "l":
      audio = new Audio('sounds/crash.mp3');
      break;
    default:
      console.log(key);
      return; 
  }

  audio.play();
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);
  
  if (activeButton) {
    activeButton.classList.add("pressed");
    activeButton.classList.add("shadow");

    setTimeout(function() {
      activeButton.classList.remove("pressed");
      activeButton.classList.remove("shadow");
    }, 100);
  }
}

