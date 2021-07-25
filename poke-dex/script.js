const poke_container = document.getElementById("poke_container");
const pokemons_number = 150;

const colors = {
  fire: "#f08030",
  grass: "#78c850",
  electric: "#f8d030",
  water: "#6890f0",
  ground: "#f4e7da",
  rock: "#b8a038",
  fairy: "#ffaec9",
  poison: "#a040a0",
  bug: "#a8b820",
  dragon: "#7038f8",
  psychic: "#f85888",
  flying: "#a890f0",
  fighting: "#c03028",
  normal: "#a8a878",
  ice: "#98d8d8",
  dark: "#705848",
  steel: "#b8b8d0",
  ghost: "#705848",
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

fetchPokemons();

function createPokemonCard(pokemon) {
  const pokemonElm = document.createElement("div");
  pokemonElm.classList.add("pokemon");

  const poke_types = pokemon.types.map((item) => item.type.name);
  const types = poke_types.join(", ");
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  const color = colors[type];

  pokemonElm.style.backgroundColor = color;

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  console.log(name);

  const pokeInnerHTML = `
    <div class='img-container'>
      <img src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png" alt="${name} image" />
    </div>
    <div class='info'>
      <span class='number'>#${pokemon.id.toString().padStart(3, 0)}</span>
      <h3 class='name'>${name}</h3>
      <h5>Type:</h5>
      <small class='type'><span>${types}</span></small>
    </div>
  `;
  pokemonElm.innerHTML = pokeInnerHTML;
  poke_container.appendChild(pokemonElm);
}
