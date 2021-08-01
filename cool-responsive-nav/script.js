const burgar = document.getElementById("burgar");
const links = document.getElementById("links");

burgar.addEventListener("click", () => {
  links.classList.toggle("show");
});
