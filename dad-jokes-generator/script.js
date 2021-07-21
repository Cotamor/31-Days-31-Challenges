const joke = document.getElementById("joke");
const generate = document.getElementById("generate");

generateJoke = async () => {
  const result = await fetch("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      return res.joke;
    })
    .catch((err) => {
      console.log(err);
    });
  joke.innerText = result;
};

generate.addEventListener("click", generateJoke);
