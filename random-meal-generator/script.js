const getMeal = document.getElementById("get_meal");
const mealContainer = document.getElementById("meal");
const url = "https://www.themealdb.com/api/json/v1/1/random.php";

getMeal.addEventListener("click", () => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      createMeal(res.meals[0]);
    })
    .catch((error) =>
      console.log("something's wrong with your fetch operation: ", error)
    );
});

function createMeal(data) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`]) {
      ingredient = data[`strIngredient${i}`];
      measure = data[`strMeasure${i}`];
      ingredients.push(`${ingredient} - ${measure}`);
    } else {
      break;
    }
  }
  console.log(ingredients);
  console.log(data);
  mealContainer.innerHTML = `
    <div class='imgBox'>
      <img src="${data.strMealThumb}" alt="meal-image" />
    </div>
    <div class="row">
      <div class="nine columns">
        <h4>${data.strMeal}</h4>
        <p class='instructions'>${data.strInstructions}</p>
        <p><strong>Category:</strong> ${data.strCategory}</p>
        <p><strong>Area:</strong> ${data.strArea}</p>
        <p><strong>Tags:</strong> ${
          data.strTags ? data.strTags.split(",").join(", ") : "No tags"
        }</p>
      </div>
      <div class="three columns">
        <h5>Ingredients:</h5>
        <ul>
          ${ingredients.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="row">
      <h5>Video Recipe</h5>
      <div class="videoWrapper">
        <iframe src="https://www.youtube.com/embed/${data.strYoutube.slice(
          -11
        )}"></iframe>
      </div>
    </div>
  `;
}
