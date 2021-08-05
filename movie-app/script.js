const form = document.getElementById("form");
const search = document.getElementById("search");
const input = document.querySelector("input");
const movie_container = document.querySelector(".movies");
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1&include_adult=true&query=";

// Initial fetch
getMovies();

async function getMovies() {
  const resp = await fetch(API_URL);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData);
}

function showMovies(data) {
  movie_container.innerHTML = "";
  data.results.forEach((result) => {
    const movieEl = document.createElement("li");
    movieEl.classList.add("movie");
    const rating = result.vote_average.toString().padEnd(3, ".0");
    movieEl.innerHTML = `
      <img src="${
        result.poster_path ? IMG_PATH + result.poster_path : "./noImage.png"
      }" alt="${result.original_title}" />
      <div class="movie-info">
          <div class="title">${result.original_title}</div>
          <div class="rating">${rating}</div>
        </div>
        <div class="overview">
          <i class="fas fa-times"></i>
          <h3>overview:</h3>
          <p>${result.overview}</p>
        </div>
    `;
    const movie = movieEl.querySelector("img");
    const overview = movieEl.querySelector(".overview");
    const close = movieEl.querySelector(".overview i");
    movie.addEventListener("click", () => {
      overview.classList.toggle("show");
    });
    close.addEventListener("click", () => {
      overview.classList.toggle("show");
    });
    movie_container.appendChild(movieEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  console.log(text);
  searchByName(text);
});

async function searchByName(term) {
  if (term) {
    const resp = await fetch(SEARCH_URL + term);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData);
  }
}
