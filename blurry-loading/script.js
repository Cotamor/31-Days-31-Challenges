const text = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let count = 0;
let opacityNum = 0;
let blurryNum = 0;
const interval = setInterval(blurry, 20);

// function blurry() {
//   count++;
//   // console.log(count);
//   text.innerText = `${count}%`;
//   if (count >= 100) {
//     clearInterval(interval);
//   }

//   opacityNum = scale(count, 0, 100, 1, 0);
//   blurryNum = scale(count, 0, 100, 30, 0).toFixed(1);

//   console.log(opacityNum, blurryNum);
//   text.style.opacity = opacityNum;
//   bg.style.filter = `blur(${blurryNum}px)`;
// }

// function scale(number, inMin, inMax, outMin, outMax) {
//   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
// }
// this function is from stack overflow
// img
