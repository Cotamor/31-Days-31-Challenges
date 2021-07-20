const progress = document.querySelector(".progress-done");
const btn = document.querySelector(".btn");

// let count = 0;

// btn.addEventListener("click", () => {
//   count += 10;
//   progress.style.width = `${count}%`;
//   progress.innerText = `${count}%`;
//   progress.style.opacity = 1;

// });
setTimeout(() => {
  progress.style.width = progress.getAttribute("data-done") + "%";
  progress.innerText = progress.getAttribute("data-done") + "%";
  progress.style.opacity = 1;
}, 1000);
