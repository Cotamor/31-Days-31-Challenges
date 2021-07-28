const mode = document.getElementById("mode");
const binaryInput = document.getElementById("binary");
const result = document.getElementById("result");

const decodeBtn = document.getElementById("btn-right");
const reverseBtn = document.getElementById("btn-left");
const clearBtn = document.getElementById("clear");

// Color themes button
mode.addEventListener("click", () => {
  console.log("dark");
  document.body.classList.toggle("dark");
});

const test =
  "01010100 01101000 01100001 01110100 00100111 01110011 00100000 01110011 01101111 00100000 01100011 01101111 01101111 01101100 00100000 01000110 01101100 01101111 01110010 01101001 01101110 00100001";
// default input
binaryInput.innerText = test;

let binaryText = "";

function decodeBinary(msg) {
  const res = msg
    // split the string into an array of strings (removing the ' ')
    .split(" ")
    // map over the substrings and convert them to numbers
    .map((b) => parseInt(b, 2))
    // map over again the numbers to charactors
    .map((num) => String.fromCharCode(num))
    // join the charactors back into a string
    .join("");
  return res;
}

function msgToBinary(b) {
  const res = b
    .split("")
    .map((m) => m.charCodeAt(0).toString(2))
    .join(" ");
  console.log(res);
  return res;
}
// msgToBinary("hello");

decodeBtn.addEventListener("click", () => {
  const msg = binaryInput.value;
  result.value = decodeBinary(msg);
});
reverseBtn.addEventListener("click", () => {
  const msg = result.value;
  binaryInput.value = msgToBinary(msg);
});

clearBtn.addEventListener("click", () => {
  binaryInput.value = "";
  result.value = ``;
});
