const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const modal = document.querySelector(".modal");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&+-=";

function getUpper() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}
function getLower() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}
function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generateEl.addEventListener("click", generatePassword);

function generatePassword() {
  const length = lengthEl.value;
  let password = "";
  if (upperEl.checked) {
    password += getUpper();
  }
  if (lowerEl.checked) {
    password += getLower();
  }
  if (numberEl.checked) {
    password += getNumber();
  }
  if (symbolEl.checked) {
    password += getSymbol();
  }
  console.log(password.length, length);

  for (let i = password.length; i < length; i++) {
    console.log("hello");
    const x = generateX();
    password += x;
  }
  console.log(password);
  pwEl.innerText = password;
}

function generateX() {
  let xs = [];
  if (upperEl.checked) {
    xs.push(getUpper());
  }
  if (lowerEl.checked) {
    xs.push(getLower());
  }
  if (numberEl.checked) {
    xs.push(getNumber());
  }
  if (symbolEl.checked) {
    xs.push(getSymbol());
  }
  if (xs.length === 0) return "";
  return xs[Math.floor(Math.random() * xs.length)];
}

copyEl.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  const textArea = document.createElement("textarea");
  const password = pwEl.innerText;

  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  modal.classList.add("show");
  setTimeout(() => {
    modal.classList.remove("show");
  }, 1500);
}
