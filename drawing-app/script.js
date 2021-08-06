const canvas = document.getElementById("canvas");
const incBtn = document.getElementById("increase");
const sizeBox = document.getElementById("size");
const decBtn = document.getElementById("decrease");
const clearBtn = document.getElementById("erase");
const colorPicker = document.getElementById("color");
const colorValue = document.getElementById("color-value");
const ctx = canvas.getContext("2d");
let color;
let size = 5;
let isPressed = false;
let x = undefined;
let y = undefined;

updateSizeOnScreen();

colorPicker.addEventListener("input", (e) => {
  color = e.target.value;
  console.log(color);
  colorValue.innerText = color;
});

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    console.log(e.offsetX, e.offsetY);
    let x2 = e.offsetX;
    let y2 = e.offsetY;
    // drawCircle(x, y, color);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

// function drawCircle(x, y, color) {
//   ctx.beginPath();
//   ctx.arc(x, y, size, 0, Math.PI * 2);
//   ctx.fillStyle = color;
//   ctx.fill();
// }

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.stroke();
}

incBtn.addEventListener("click", () => {
  size += 1;
  if (size >= 30) {
    size = 30;
  }
  updateSizeOnScreen();
});
decBtn.addEventListener("click", () => {
  size -= 1;
  if (size <= 1) {
    size = 1;
  }
  updateSizeOnScreen();
});
erase.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSizeOnScreen() {
  sizeBox.innerText = size;
}
