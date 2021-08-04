const form = document.getElementById("form");
const input = document.querySelector("input");
const todos_container = document.querySelector(".todos-container");

const todos = JSON.parse(localStorage.getItem("todos"));

console.log(todos);
if (todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("div");
    if (todo && todo.complete) {
      todoEl.classList.add("complete");
    }

    todoEl.classList.add("todo");
    todoEl.innerText = todoText;

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      // if (e.button == 2) {
      console.log("right");
      todoEl.remove();
      updateLS();
      // }
    });

    todoEl.addEventListener("click", (e) => {
      // if (e.button == 0) {
      console.log("left");
      todoEl.classList.toggle("complete");
      updateLS();
      // }
    });

    todos_container.appendChild(todoEl);
    input.value = "";
    updateLS();
  }
}

function updateLS() {
  const todosText = document.querySelectorAll(".todo");
  const todos = [];
  todosText.forEach((todo) => {
    todos.push({
      text: todo.innerText,
      complete: todo.classList.contains("complete"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
