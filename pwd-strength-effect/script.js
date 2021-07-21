console.log("hello world");

const background = document.getElementById("background");
const password = document.getElementById("password");
// const blurRange = {
//   0: 16,
//   1: 14,
//   2: 12,
//   3: 10,
//   4: 8,
//   5: 6,
//   6: 4,
//   7: 2,
//   8: 0,
// };

function handleChange(e) {
  const result = e.target.value.length;
  const blurValue = 20 - result * 2;
  background.style.filter = `blur(${blurValue}px)`;
}

password.addEventListener("input", handleChange);
