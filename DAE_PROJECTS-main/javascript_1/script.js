const taskForm = document.getElementById("taskForm");
const taskTitleInput = document.getElementById("taskTitle");
const taskDueDateInput = document.getElementById("taskDueDate");
const taskDueTimeInput = document.getElementById("taskDueTime");
const taskList = document.getElementById("taskList");

const currentDateDisplay = document.getElementById("currentDate");
const miniCalendar = document.getElementById("miniCalendar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show current date in calendar container
function showCurrentDate() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  currentDateDisplay.textContent = now.toLocaleDateString(undefined, options);
}

// Render a small month calendar showing days, highlight today
function renderMiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  miniCalendar.innerHTML = "";

  // Get first day of month (0=Sun..6=Sat)
  const firstDay = new Date(year, month, 1).getDay();
  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add blank days for firstDay offset
  for (let i = 0; i < firstDay; i++) {
    const blankDay = document.createElement("div");
    miniCalendar.appendChild(blankDay);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    if (day === now.getDate()) {
      dayDiv.classList.add("today");
    }
    miniCalendar.appendChild(dayDiv);
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks in the list
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskEl = document.createElement("div");
    taskEl.classList.add("task");
    if (task.completed) taskEl.classList.add("completed");

    // Format due date/time nicely
    const dueDateObj = new Date(task.dueDateTime);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const dueDateStr =
      dueDateObj.toLocaleDateString(undefined, options) +
      " " +
      dueDateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      });

    taskEl.innerHTML = `
      <input type="checkbox" data-id="${task.id}" ${
      task.completed ? "checked" : ""
    } />
      <span>${task.title}</span>
      <small>Due: ${dueDateStr}</small>
      <button data-id="${task.id}" title="Delete task">&times;</button>
    `;

    taskList.appendChild(taskEl);
  });
}

// Add a new task
function addTask(event) {
  event.preventDefault();

  const title = taskTitleInput.value.trim();
  const dueDate = taskDueDateInput.value;
  const dueTime = taskDueTimeInput.value;

  if (!title || !dueDate || !dueTime) {
    alert("Please fill out all fields!");
    return;
  }

  const dueDateTime = dueDate + "T" + dueTime; // ISO format for Date

  const newTask = {
    id: Date.now(),
    title,
    dueDateTime,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  taskForm.reset();
}

// Toggle task complete
function toggleTaskComplete(id) {
  const task = tasks.find((t) => t.id == id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id != id);
  saveTasks();
  renderTasks();
}

// Event listeners
taskForm.addEventListener("submit", addTask);

taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
    toggleTaskComplete(e.target.dataset.id);
  }
  if (e.target.tagName === "BUTTON") {
    deleteTask(e.target.dataset.id);
  }
});

// Initial setup
showCurrentDate();
renderMiniCalendar();
renderTasks();
document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");
  const taskList = document.getElementById("taskList");
  const taskHistory = document.getElementById("taskHistory");
  const currentDate = document.getElementById("currentDate");
  const addTaskBtn = document.getElementById("addTaskBtn");

  function updateDate() {
    const now = new Date();
    currentDate.textContent =
      now.toDateString() + " " + now.toLocaleTimeString();
  }
  updateDate();
  setInterval(updateDate, 1000);

  function addHistory(message) {
    const li = document.createElement("li");
    li.textContent = message;
    taskHistory.prepend(li);
  }

  function addTask(text, datetime) {
    const li = document.createElement("li");
    li.className = "bg-pink-100 p-2 rounded flex justify-between items-center";

    const taskText = document.createElement("span");
    taskText.textContent = `${text} - due ${new Date(
      datetime
    ).toLocaleString()}`;
    li.appendChild(taskText);

    const controls = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newText = prompt("Edit task", text);
      if (newText) {
        taskText.textContent = `${newText} - due ${new Date(
          datetime
        ).toLocaleString()}`;
        addHistory(`✏️ Edited task: "${text}" → "${newText}"`);
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      taskList.removeChild(li);
      addHistory(`🗑️ Deleted task: "${text}"`);
    };

    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);
    li.appendChild(controls);

    taskList.appendChild(li);
    addHistory(`✅ Added task: "${text}"`);
  }

  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const datetime = taskDate.value;
    if (!text || !datetime) {
      alert("Please enter a task and a valid date/time.");
      return;
    }
    addTask(text, datetime);
    taskInput.value = "";
    taskDate.value = "";
  });
});
