document.addEventListener("DOMContentLoaded", function () {
  const taskInputElement = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskBtn");
  const taskListElement = document.getElementById("taskList");
  const taskCountElement = document.getElementById("taskCount");

  let totalTasks = 0; // Integer variable
  loadTasks();

  function addTask() {
    const taskDescription = taskInputElement.value.trim();
    const isTaskValid = taskDescription.length > 1; // Boolean variable

    console.log("Adding Task:", taskDescription); // Console Output

    if (!isTaskValid) {
      alert("Task must be at least 2 characters long! 🚫");
      return;
    }

    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");

    taskElement.innerHTML = `
            <span class="task-text">${taskDescription}</span>
            <button class="complete-btn">✅</button>
            <button class="delete-btn">❌</button>
        `;

    taskListElement.appendChild(taskElement);
    totalTasks++; // Mathematical operation
    updateTaskCount();
    saveTasks();

    taskElement
      .querySelector(".complete-btn")
      .addEventListener("click", function () {
        taskElement.classList.toggle("completed");

        // Logical operator (AND)
        if (taskElement.classList.contains("completed") && totalTasks > 0) {
          console.log("Task Completed:", taskDescription);
        }

        saveTasks();
      });

    taskElement
      .querySelector(".delete-btn")
      .addEventListener("click", function () {
        // Logical operator (OR)
        if (
          confirm("Are you sure you want to delete this task?") ||
          taskElement.classList.contains("completed")
        ) {
          taskElement.classList.add("fade-out");
          setTimeout(() => {
            taskElement.remove();
            totalTasks--; // Mathematical operation
            updateTaskCount();
            saveTasks();
          }, 500);
        }
      });

    taskInputElement.value = "";
  }

  addTaskButton.addEventListener("click", addTask);
  taskInputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  function updateTaskCount() {
    taskCountElement.textContent = totalTasks; // Output to DOM
    console.log("Updated Task Count:", totalTasks); // Console Output
  }

  function saveTasks() {
    localStorage.setItem("tasks", taskListElement.innerHTML);
    localStorage.setItem("taskCount", totalTasks); // Store task count
  }

  function loadTasks() {
    const storedTaskData = localStorage.getItem("tasks");
    const storedTaskCount = parseInt(localStorage.getItem("taskCount")) || 0;

    if (storedTaskData) {
      taskListElement.innerHTML = storedTaskData;
      totalTasks = storedTaskCount;
      updateTaskCount();

      document.querySelectorAll(".complete-btn").forEach((button) =>
        button.addEventListener("click", function () {
          button.parentElement.classList.toggle("completed");
          saveTasks();
        })
      );

      document.querySelectorAll(".delete-btn").forEach((button) =>
        button.addEventListener("click", function () {
          button.parentElement.classList.add("fade-out");
          setTimeout(() => {
            button.parentElement.remove();
            totalTasks--; // Update count after removal
            updateTaskCount();
            saveTasks();
          }, 500);
        })
      );
    }
  }
});
