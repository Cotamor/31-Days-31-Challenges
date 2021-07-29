const burgar = document.getElementById("burgar");
const close = document.getElementById("close");
const menu = document.querySelector(".menu");

burgar.addEventListener("click", () => {
  menu.classList.toggle("show");
});
close.addEventListener("click", () => {
  menu.classList.toggle("show");
});
