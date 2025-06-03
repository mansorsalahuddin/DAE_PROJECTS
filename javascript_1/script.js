document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
      taskList.appendChild(listItem);
      taskInput.value = "";
    }
  });
});
