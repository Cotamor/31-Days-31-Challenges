const textArea = document.querySelector("textarea");
const start = document.getElementById("start");
const output = document.getElementById("output");
let inputElms = [];

textArea.focus();

textArea.addEventListener("keyup", (e) => {
  createTags(e.target.value);
});

start.addEventListener("click", () => {
  console.log(inputElms);
  getRandomPick(inputElms);
});

function createTags(elms) {
  // split text into words, eliminating spaces and commas
  const elements = elms
    .split(",")
    .filter((item) => item.trim() !== "")
    .map((item) => item.trim());
  // filter any duplicates from array
  inputElms = Array.from(new Set(elements));
  // clear the spans first
  output.innerHTML = "";
  inputElms.forEach((item, idx) => {
    const spanItem = document.createElement("span");
    spanItem.innerText = item;
    spanItem.id = idx;
    output.append(spanItem);
  });
}

function getRandomPick(arr) {
  const outputItems = document.querySelectorAll(".output span");
  // clear the previous pick
  if (outputItems) {
    outputItems.forEach((item) => (item.classList = ""));
  }
  // change color of items picked
  const interval = setInterval(() => {
    const ranNum = Math.floor(Math.random() * arr.length);
    // console.log(outputItems[ranNum]);
    outputItems[ranNum].classList.add("picked");
    setTimeout(() => {
      outputItems[ranNum].classList.remove("picked");
    }, 100);
  }, 100);

  // After 5 seconds changing colors end
  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const num = Math.floor(Math.random() * arr.length);
      outputItems[num].classList.add("picked");
    }, 100);
  }, 5000);
}
