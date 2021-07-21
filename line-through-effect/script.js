const text = document.getElementById("text");
const textArr = text.innerText.split("");

const newElm = document.createElement("h1");
console.log(textArr);
newElm.innerHTML = `${textArr
  .map((letter) => `<span style="${randomVisibility()}">${letter}</span>`)
  .join("")}
`;

newElm.classList.add("overlay");
document.body.appendChild(newElm);

function randomVisibility() {
  return Math.random() > 0.5 ? "visibility: hidden" : "visibility: visible";
}
