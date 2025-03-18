document.addEventListener("DOMContentLoaded", function () {
  const taskInputElement = document.getElementById("taskInput");
  const taskDateTimeElement = document.getElementById("taskDateTime");
  const addTaskButton = document.getElementById("addTaskBtn");
  const taskListElement = document.getElementById("taskList");
  const taskCountElement = document.getElementById("taskCount");

  let totalTasks = 0;
  loadTasks();

  function addTask() {
    const taskDescription = taskInputElement.value.trim();
    const taskDateTime = taskDateTimeElement.value.trim();

    if (taskDescription.length <= 1) {
      alert("Task must be at least 2 characters long! 🚫");
      return;
    }

    if (!taskDateTime) {
      alert("Please select a date and time for the task! 🕒");
      return;
    }

    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = taskDescription;

    const timestamp = document.createElement("small");
    timestamp.classList.add("timestamp");
    timestamp.textContent = `📅 Due: ${new Date(
      taskDateTime
    ).toLocaleString()}`;

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.textContent = "✅";
    completeButton.addEventListener("click", function () {
      taskElement.classList.toggle("completed");
      saveTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this task?")) {
        taskElement.classList.add("fade-out");
        setTimeout(() => {
          taskElement.remove();
          totalTasks--;
          updateTaskCount();
          saveTasks();
        }, 500);
      }
    });

    // Append elements
    taskElement.appendChild(taskText);
    taskElement.appendChild(document.createElement("br"));
    taskElement.appendChild(timestamp);
    taskElement.appendChild(completeButton);
    taskElement.appendChild(deleteButton);
    taskListElement.appendChild(taskElement);

    totalTasks++;
    updateTaskCount();
    saveTasks();
    taskInputElement.value = "";
    taskDateTimeElement.value = "";
  }

  function updateTaskCount() {
    taskCountElement.textContent = totalTasks;
  }

  function saveTasks() {
    localStorage.setItem("tasks", taskListElement.innerHTML);
    localStorage.setItem("taskCount", totalTasks);
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
            totalTasks--;
            updateTaskCount();
            saveTasks();
          }, 500);
        })
      );
    }
  }

  addTaskButton.addEventListener("click", addTask);
  taskInputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Calendar update function
  function updateMiniCalendar() {
    const calendarElement = document.getElementById("calendarText");
    const now = new Date();
    const options = { weekday: "short", month: "short", day: "numeric" };
    calendarElement.textContent = `📆 ${now.toLocaleDateString(
      "en-US",
      options
    )}`;
  }

  // Fix for hover effect to show and not hide the calendar
  const miniCalendar = document.getElementById("miniCalendar");
  miniCalendar.addEventListener("mouseover", function () {
    this.innerHTML = "⏳ Time waits for no one!";
    this.classList.add("flip");
  });

  miniCalendar.addEventListener("mouseleave", function () {
    updateMiniCalendar();
    this.classList.remove("flip");
  });

  updateMiniCalendar(); // Run on page load
});
document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("sendBtn");
  const userInputElement = document.getElementById("userInput");
  const chatContent = document.getElementById("chatContent");

  // Predefined chatbot responses with some fun replies
  const chatbotResponses = {
    hello: "👋 Hey there! Ready to chat? 🗣️",
    "how are you?": "I'm feeling like a million bucks! 💸 How about you? 😎",
    "tell me a joke":
      "Why don’t skeletons fight each other? They don’t have the guts! 💀😂",
    bye: "Goodbye, my friend! Don't forget to smile! 😁",
    default:
      "Oops! I don't quite get that... 🤔 Could you try saying it differently?",
    "who are you?":
      "I’m your friendly chatbot! Just here to bring some fun to your day! 😄",
  };

  // Fun responses for some phrases
  const funResponses = [
    "🌟 I'm on fire today! 🔥",
    "🎶 I'm like a vinyl, spinning good vibes! 🎶",
    "💡 Did you know? I'm the smartest chatbot in the galaxy... I read books while eating pizza 🍕📚",
    "⏳ I'm basically a time machine that only travels in fun conversations! 😜",
  ];

  // Display a message in the chat
  function displayMessage(message, sender = "bot") {
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight; // Keep chat scrolled to the bottom
  }

  // Send the user message and get a response
  function sendMessage() {
    const userMessage = userInputElement.value.trim();
    if (userMessage) {
      displayMessage(`You: ${userMessage}`, "user");
      userInputElement.value = ""; // Clear input

      // Get bot response based on user input or a fun response
      const normalizedMessage = userMessage.toLowerCase();
      let response =
        chatbotResponses[normalizedMessage] || chatbotResponses["default"];

      // Add a random fun response sometimes
      if (Math.random() < 0.3) {
        response =
          funResponses[Math.floor(Math.random() * funResponses.length)];
      }

      setTimeout(() => {
        displayMessage(response, "bot");
      }, 1000); // Bot replies after 1 second for a fun delay
    }
  }

  // Trigger message on button click
  sendButton.addEventListener("click", sendMessage);

  // Trigger message on 'Enter' key press
  userInputElement.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  // Initial bot greeting message
  setTimeout(() => {
    displayMessage(
      "Bot: Hello! I'm your fun chatbot! Type 'hello' to get started or ask me anything! 😁",
      "bot"
    );
  }, 500);
});
