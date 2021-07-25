const count = document.getElementById("count");

function updateCount() {
  fetch("https://api.countapi.xyz/update/kota-naka/edasaki?amount=1")
    .then((res) => res.json())
    .then((res) => (count.innerHTML = res.value));
}

updateCount();
