let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


function renderTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  let filtered = todos.filter(todo => {
    if (currentFilter === "completed") return todo.done;
    if (currentFilter === "pending") return !todo.done;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-700 px-3 py-2 rounded-md";

    li.innerHTML = `
      <div>
        <span class="font-semibold ${todo.done ? 'line-through text-gray-400' : ''}">
          ${todo.text}
        </span>
        <span class="ml-2 text-sm text-gray-300">[${todo.category}]</span>
      </div>
      <div class="space-x-2">
        <button onclick="toggleDone(${index})" class="px-2 py-1 bg-blue-500 rounded-md">
          ${todo.done ? "Undo" : "Done"}
        </button>
        <button onclick="editTodo(${index})" class="px-2 py-1 bg-yellow-500 rounded-md">Edit</button>
        <button onclick="deleteTodo(${index})" class="px-2 py-1 bg-red-500 rounded-md">X</button>
      </div>
    `;
    list.appendChild(li);
  });
} 

// add tasks
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("todoInput");
  const category = document.getElementById("category").value;

  if (input.value.trim() === "") return alert("Please enter a task!");

  todos.push({ text: input.value, category, done: false });
  input.value = "";
  saveTodos();
  renderTodos();
});

// done tasks
function toggleDone(index) {
  todos[index].done = !todos[index].done;
  saveTodos();
  renderTodos();
}

// edit task
function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText;
    saveTodos();
    renderTodos();
  }
}

// delete task
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// clear all the tasks
document.getElementById("clearAll").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
});

// filter
document.querySelectorAll(".filterBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});


renderTodos();
