const url = "https://api.github.com/users/";
const form = document.getElementById("form");
const input = document.querySelector("input");
const profile_container = document.querySelector(".profile-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = input.value;

  getGhUser(user);
});

async function getGhUser(user) {
  const userData = await fetch(url + user);
  const res = await userData.json();

  const {
    avatar_url,
    name,
    bio,
    followers,
    following,
    public_repos,
    repos_url,
  } = res;
  const repoResponse = await getRepos(repos_url);

  // Extract 10 repos at maximum from data
  const repos = [];
  for (let i = 0; i < 10; i++) {
    if (repoResponse[i]) {
      repos.push(repoResponse[i].name);
    } else {
      break;
    }
  }
  console.log(repos);

  profile_container.innerHTML = "";
  const profileEl = document.createElement("div");
  profileEl.classList.add("profile");
  profileEl.innerHTML = `
    <div class="img">
      <img src="${avatar_url}" alt="avatar of ${name}">
    </div>
    <div class="profile-info">
      <h1 class="name">${name}</h1>
      <p class="bio">${bio}</p>
      <p class="numbers">
        <span class="follower">${followers} <strong>Followers</strong> </span>
        <span class="follow">${following} <strong>Following</strong> </span>
        <span class="repos">${public_repos} <strong>Repos</strong> </span>
      </p>
      <div class="reopsitory">
        ${repos
          .map((repo) => `<span class="repo-title">${repo}</span>`)
          .join("")}
      </div>
    </div>
  `;
  profile_container.appendChild(profileEl);
}
async function getRepos(url) {
  const reposData = await fetch(url);
  const resp = await reposData.json();
  return resp;
}
