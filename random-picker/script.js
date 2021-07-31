const textArea = document.querySelector("textarea");
const start = document.getElementById("start");

const output = document.getElementById("output");

function getRandomPick(arr) {
  const outputItems = document.querySelectorAll(".output span");

  // change color of items picked
  const setIntId = setInterval(() => {
    const ranNum = Math.floor(Math.random() * arr.length);
    // console.log(outputItems[ranNum]);
    outputItems[ranNum].classList.add("picked");
    setTimeout(() => {
      outputItems[ranNum].classList.remove("picked");
    }, 100);
  }, 100);

  // After 5 seconds changing colors end
  setTimeout(() => {
    const num = Math.floor(Math.random() * arr.length);
    clearInterval(setIntId);
    console.log("result", num);
    outputItems[num].classList.add("picked");
  }, 5000);
}

start.addEventListener("click", () => {
  output.innerHTML = "";
  // split text into words, eliminating spaces and commas
  let names = textArea.value.split(",").map((item) => item.trim());
  // filter duplicates from array
  names = Array.from(new Set(names));
  // console.log(names);
  names.forEach((name, idx) => {
    const spanItem = document.createElement("span");
    spanItem.innerText = name;
    spanItem.id = idx;
    output.append(spanItem);
  });

  getRandomPick(names);
});
