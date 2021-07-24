const container = document.getElementById("container");

const SQUARE_NUM = 500;
const colors = ["#E920FF", "#0023ff", "#1bd700", "#ffff00", "#ff8600"];
const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
const setColorToElm = (elm) => {
  const color = getRandomColor();
  elm.style.background = color;
  elm.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
};
const removeColorToElm = (elm) => {
  elm.style.backgroundColor = "#1d1d1d";
  elm.style.boxShadow = `0 0 2px #000`;
};

for (let i = 0; i < SQUARE_NUM; i++) {
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover", () => {
    setColorToElm(square);
  });
  square.addEventListener("mouseout", () => {
    removeColorToElm(square);
  });

  container.appendChild(square);
}
