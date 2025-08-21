const $ = (sel) => document.querySelector(sel);
const listEl = $("#list");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

function render() {
  const hideDone = $("#hideDone").checked;
  const q = $("#search").value.toLowerCase();
  listEl.innerHTML = "";
  tasks
    .filter(
      (t) => (hideDone ? !t.done : true) && t.title.toLowerCase().includes(q)
    )
    .forEach((t) => {
      const li = document.createElement("li");
      li.className = "item" + (t.done ? " done" : "");
      li.innerHTML = `
        <input type="checkbox" ${t.done ? "checked" : ""} data-id="${t.id}" class="toggle">
        <span class="title" contenteditable="true" data-id="${t.id}">${t.title}</span>
        <div class="actions">
          <button class="del" data-id="${t.id}">Delete</button>
        </div>`;
      listEl.appendChild(li);
    });
  $("#stats").textContent =
    tasks.filter((t) => !t.done).length +
    " pending / " +
    tasks.length +
    " total";
}

function addTask(title) {
  if (!title.trim()) return;
  tasks.unshift({ id: Date.now(), title: title.trim(), done: false });
  saveTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  render();

  // ✅ Fixed add button
  $("#addBtn").onclick = () => {
    const val = $("#taskInput").value;
    addTask(val);
    $("#taskInput").value = "";
  };

  // Add task with Enter key
  $("#taskInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask(e.target.value);
      e.target.value = "";
    }
  });

  $("#hideDone").onchange = render;
  $("#search").oninput = render;
  $("#clearAll").onclick = () => {
    if (confirm("Clear all tasks?")) {
      tasks = [];
      saveTasks();
    }
  };

  // Toggle done
  listEl.addEventListener("change", (e) => {
    if (e.target.classList.contains("toggle")) {
      const id = +e.target.dataset.id;
      const t = tasks.find((x) => x.id === id);
      if (t) {
        t.done = e.target.checked;
        saveTasks();
      }
    }
  });

  // Delete task
  listEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      const id = +e.target.dataset.id;
      tasks = tasks.filter((x) => x.id !== id);
      saveTasks();
    }
  });

  // Edit title (blur)
  listEl.addEventListener(
    "blur",
    (e) => {
      if (e.target.classList.contains("title")) {
        const id = +e.target.dataset.id;
        const t = tasks.find((x) => x.id === id);
        if (t) {
          t.title = e.target.textContent.trim();
          saveTasks();
        }
      }
    },
    true
  );

  // Notes
  const notesEl = $("#notes");
  notesEl.value = localStorage.getItem("notes") || "";
  let timer;
  notesEl.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      localStorage.setItem("notes", notesEl.value);
      $("#saved").textContent = "Saved " + new Date().toLocaleTimeString();
    }, 300);
  });
});
