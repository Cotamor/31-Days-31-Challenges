const countries_container = document.getElementById("countries_container");
const mode = document.getElementById("mode");
const input = document.getElementById("search");
const dropdown = document.getElementById("dropdown");
const regions = document.querySelectorAll(".dropdown li");
const closeModal = document.getElementById("closeModal");
const searchBar = document.querySelector(".search-bar");
const modal = document.querySelector(".modal");

console.log(regions);

// Color themes button
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("hide");
});

const getCountries = async () => {
  const url = "https://restcountries.eu/rest/v2/all";
  const res = await fetch(url);
  const countries = await res.json();
  // console.log(countries);
  createCountryCards(countries);
};

getCountries();

function createCountryCards(countries) {
  countries_container.innerHTML = "";

  countries.forEach((c) => {
    const country = document.createElement("div");
    country.classList.add("country");

    country.innerHTML = `
        <div class="img-container">
          <img src="${c.flag}" alt="flag of ${c.name}" />
        </div>
        <div class="info">
          <h2 class="name">${c.name}</h2>
          <p class="population"><strong>Population</strong>:${c.population.toLocaleString(
            "en-US"
          )}</p>
          <p class="region"><strong>Region</strong>:${c.region}</p>
          <p class="capital"><strong>Capital</strong>:${c.capital}</p>
        </div>
    `;

    country.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(c);
    });

    countries_container.appendChild(country);
  });
}

// Display a country detailed page
function showCountryDetails(c) {
  const modalBody = modal.querySelector(".modal-body");
  const modalImg = modal.querySelector("img");

  modalImg.src = c.flag;
  modalBody.innerHTML = `
  <h2 class="name">${c.name}</h2>
  <p ><strong>Native Name</strong>: ${c.nativeName}</p>
  <p ><strong>Population</strong>: ${c.population.toLocaleString("en-US")}</p>
  <p ><strong>Region</strong>: ${c.region}</p>
  <p ><strong>Sub Region</strong>: ${c.subregion}</p>
  <p ><strong>Capital</strong>: ${c.capital}</p>
  <p ><strong>Top Level Domain</strong>: ${c.topLevelDomain}</p>
  <p ><strong>Currencies</strong>: ${c.currencies
    .map((item) => {
      const { name } = item;
      return name;
    })
    .join(", ")}</p>
  <p ><strong>Languages</strong>: ${c.languages
    .map((item) => {
      const { name } = item;
      return name;
    })
    .join(", ")}</p>
  <p ><strong>Border Countries</strong>: ${c.borders}</p>
  `;
}

// Search for a country by input
input.addEventListener("input", (e) => {
  const text = e.target.value;
  // console.log(text);
  const countryNames = document.querySelectorAll(".name");
  countryNames.forEach((name) => {
    if (name.innerText.toLowerCase().includes(text.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});
// Filter countries by a region
regions.forEach((region) => {
  region.addEventListener("click", (e) => {
    const text = e.target.innerText;
    console.log(text);

    const countryRegions = document.querySelectorAll(".region");
    countryRegions.forEach((item) => {
      if (item.innerText.includes(text) || text === "All") {
        item.parentElement.parentElement.style.display = "block";
      } else {
        item.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

closeModal.addEventListener("click", () => {
  const modalBody = modal.querySelector(".modal-body");
  const modalImg = modal.querySelector("img");
  modalImg.src = "";
  modalBody.innerHTML = "";
  modal.style.display = "none";
});
