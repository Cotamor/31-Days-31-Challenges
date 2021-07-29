const toggle = document.getElementById("toggle");

toggle.addEventListener("change", (e) => {
  // check if checkbox is checked or not
  const checked = e.currentTarget.checked;
  console.log(checked);
  if (checked) {
    // if ture, turn on dark mode
    document.body.classList.add("dark");
  } else {
    // if false ,turn off dark mode
    document.body.classList.remove("dark");
  }
});
