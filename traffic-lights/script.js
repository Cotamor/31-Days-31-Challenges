const circles = document.querySelectorAll(".circle");
let activeLight = 0;
const arr = ["red", "green", "yellow"];

setInterval(changeLight, 1000);

function changeLight() {
  circles[activeLight].className = "circle";
  activeLight += 1;
  if (activeLight > 2) {
    activeLight = 0;
  }
  let color = circles[activeLight].getAttribute("color");
  circles[activeLight].classList.add(color);
}
