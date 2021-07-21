const joke = document.getElementById("joke");
const generate = document.getElementById("generate");

generate.addEventListener("click", () => {
  fetch("https://icanhazdadjoke.com/slack")
    .then((res) => res.json())
    .then((res) => {
      console.log(res.attachments[0].text);
      joke.innerText = res.attachments[0].text;
    });
});
