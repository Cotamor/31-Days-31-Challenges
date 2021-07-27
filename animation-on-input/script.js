const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, index) =>
        `<span style='transition-delay: ${index * 50}ms'>${letter}</span>`
    )
    .join("");
});
