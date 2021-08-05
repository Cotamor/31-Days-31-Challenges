const projects = [
  { name: "custom-progress-bar" },
  { name: "dad-jokes-generator" },
  { name: "pwd-strength-effect" },
  { name: "line-through-effect" },
  { name: "visual-counter" },
  { name: "css-custom-checkbox" },
  { name: "traffic-lights" },
  { name: "image-reflection" },
  { name: "hover-board" },
  { name: "mix-blend-loader" },
  { name: "auto-text-effect" },
  { name: "css-smooth-scroll" },
  { name: "random-meal-generator" },
  { name: "live-visits-counter" },
  { name: "wave-animation" },
  { name: "poke-dex" },
  { name: "countdown-timer" },
  { name: "rest-countries-api" },
  { name: "kinetic-loader" },
  { name: "newsletter-design" },
  { name: "rotating-circles" },
  { name: "animation-on-input" },
  { name: "decode-binary-msg" },
  { name: "zoom-effect" },
  { name: "sidebar-menu" },
  { name: "dark-theme-toggle" },
  { name: "loading-animation" },
  { name: "pulse-effect" },
  { name: "netflix-nav-animation" },
  { name: "random-picker" },
  { name: "cool-responsive-nav" },
  { name: "heart-shape-css" },
  { name: "donate-card" },
  { name: "recipe-app" },
  { name: "notes-app" },
  { name: "todo-app" },
  { name: "movie-app" },
];

const list = document.getElementById("list");

projects.forEach(({ name }, idx) => {
  console.log(name);
  const listItem = document.createElement("li");
  listItem.innerHTML = `
   
      <a href="/${name}/index.html">
        <img src="./${name}/desktop-design.png" alt="${name}" />
      </a>
      <div class="content">
        <h3>${idx + 1}. ${formatTitle(name)}</h3>
        <a href="/${name}"><button>View Live</button></a>
      </div> 
  `;
  list.appendChild(listItem);
});

function formatTitle(title) {
  return title
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
