// DOM references
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const activeList = document.getElementById("activeTasks");
const completedList = document.getElementById("completedTasks");

// Add new task on form submit
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText, false);
    taskInput.value = "";
  }
});

// Create task item element with icons
function createTaskItem(text, isCompleted) {
  const li = document.createElement("li");
  li.className = "todo__item";
  li.textContent = text;

  const actions = document.createElement("div");
  actions.className = "todo__actions";

  // Toggle complete / undo button
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = isCompleted
    ? '<i class="fas fa-undo-alt"></i>'
    : '<i class="fas fa-check-circle"></i>';
  toggleBtn.title = isCompleted ? "Move to Active" : "Mark as Completed";
  toggleBtn.addEventListener("click", () => {
    li.remove();
    addTask(text, !isCompleted);
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.title = "Delete Task";
  deleteBtn.addEventListener("click", () => li.remove());

  actions.appendChild(toggleBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);

  return li;
}

// Append task to appropriate list
function addTask(text, isCompleted) {
  const taskItem = createTaskItem(text, isCompleted);
  if (isCompleted) {
    completedList.appendChild(taskItem);
  } else {
    activeList.appendChild(taskItem);
  }
}
