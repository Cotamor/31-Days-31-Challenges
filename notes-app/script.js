const addBtn = document.querySelector(".add");
const container = document.querySelector(".container");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  console.log("click");
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("notes");
  note.innerHTML = `
    <div class="tools">
      <button class="delete"><i class="fas fa-times"></i></button>
      <button class="edit"><i class="far fa-edit"></i></button>
      <button class="mark"><i class="fab fa-markdown"></i></button>
      <button class='clear'><i class="far fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}">${text}</div>
    <textarea class="${text ? "hidden" : ""}">${text}</textarea>
  `;
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  const deleteBtn = note.querySelector(".delete");
  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLS();
  });

  const editBtn = note.querySelector(".edit");
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    main.innerText = textArea.value;
  });

  const clearBtn = note.querySelector(".clear");
  clearBtn.addEventListener("click", async () => {
    textArea.value = "";
    main.innerHTML = "";
    await updateLS();
  });

  const markBtn = note.querySelector(".mark");
  markBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");

    main.innerHTML = marked(textArea.value);
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e;
    main.innerHTML = value;
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
