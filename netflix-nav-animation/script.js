const burgar = document.getElementById("burgar");
const closeBtn = document.getElementById("close-btn");
const mobileNavs = document.querySelectorAll(".mobile-nav");

burgar.addEventListener("click", () => {
  // add visible class
  mobileNavs.forEach((nav) => {
    nav.classList.add("visible");
  });
});
closeBtn.addEventListener("click", () => {
  // add visible class
  mobileNavs.forEach((nav) => {
    nav.classList.remove("visible");
  });
});
