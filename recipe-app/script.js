const meal_container = document.querySelector(".meal-container");
const fav_meal_container = document.querySelector(".fav-meal-container");
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const mealImgs = document.querySelectorAll("img");
const meal_info_container = document.querySelector(".meal-info-container");

// Show a random meal when the page open

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const mealData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const res = await mealData.json();
  const randMeal = res.meals[0];
  // console.log(randMeal);
  addMeal(randMeal, true);
}

function addMeal(meal, rand = false) {
  const mealElm = document.createElement("div");
  mealElm.classList.add("meal");
  mealElm.id = meal.idMeal;
  mealElm.innerHTML = `
      ${rand ? '<div class="random">Random Recipe</div>' : ""}
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="meal-body">
        <h4>${meal.strMeal}</h4>
        <button class="fav-btn">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    `;
  const btnLiked = mealElm.querySelector(".meal-body .fav-btn");
  btnLiked.addEventListener("click", () => {
    if (btnLiked.classList.contains("liked")) {
      removeFavLoc(meal.idMeal);
      btnLiked.classList.remove("liked");
    } else {
      addFavLoc(meal.idMeal);
      btnLiked.classList.add("liked");
    }
  });
  const mealImg = mealElm.querySelector("img");
  mealImg.addEventListener("click", (e) => {
    const id = e.target.parentNode.id;
    console.log(id);
    showInfo(id);
  });

  meal_container.appendChild(mealElm);
}

// Show meals when user search meals by name

async function searchMeals(name) {
  console.log(name);
  const mealData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + name
  );
  const res = await mealData.json();
  const mealsData = res.meals;
  return mealsData;
}

searchBtn.addEventListener("click", async () => {
  meal_container.innerHTML = "";
  const val = search.value;
  if (val) {
    const meals = await searchMeals(val);
    console.log(meals);
    meals.forEach((meal) => {
      addMeal(meal);
    });
  } else {
    console.log("Please enter ingredient");
  }
});

async function getMealById(id) {
  const mealData = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const res = await mealData.json();
  const mealGotById = res.meals[0];
  // console.log(mealGotById);
  return mealGotById;
}

async function fetchFavMeals() {
  fav_meal_container.innerHTML = "";
  const mealIds = getFavsLoc();

  // const meals = [];
  for (let i = 0; i < mealIds.length; i++) {
    const meal = await getMealById(mealIds[i]);
    // meals.push(meal);
    addMealToFav(meal);
  }
}

function addMealToFav(meal) {
  const fav = document.createElement("li");
  fav.classList.add("fav");
  fav.id = meal.idMeal;
  fav.innerHTML = `
        <button id='clear' class='clear'><i class="fas fa-times"></i></button>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
      `;
  const clearBtn = fav.querySelector("button");
  clearBtn.addEventListener("click", (e) => {
    const id = e.target.parentNode.parentNode.id;
    removeFavLoc(id);
  });

  const favImg = fav.querySelector("img");
  favImg.addEventListener("click", (e) => {
    const id = e.target.parentNode.id;
    console.log(id);
    showInfo(id);
  });
  fav_meal_container.appendChild(fav);
}

function addFavLoc(mealId) {
  const mealIds = getFavsLoc();
  // console.log(mealid);
  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
  fetchFavMeals();
}

function removeFavLoc(mealId) {
  const mealIds = getFavsLoc();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
  fetchFavMeals();
}

function getFavsLoc() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

async function showInfo(id) {
  meal_info_container.innerHTML = "";
  const mealData = await getMealById(id);

  const ings = [];
  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient` + i]) {
      ings.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  const mealInfo = document.createElement("li");
  mealInfo.classList.add("meal-info");
  mealInfo.innerHTML = `
    <button class="btn info-close">
      <i class="fas fa-times"></i>
    </button>
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <p>${mealData.strInstructions}</p>
    <h3>Ingredient</h3>
    <ul>
      ${ings.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
  `;
  const closeBtn = mealInfo.querySelector("button");
  closeBtn.addEventListener("click", () => {
    meal_info_container.classList.toggle("hidden");
  });

  meal_info_container.classList.toggle("hidden");
  meal_info_container.appendChild(mealInfo);
}
