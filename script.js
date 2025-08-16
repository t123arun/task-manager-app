//Task Class
class Task {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

//TaskManager class
class TaskManager {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.taskList = document.getElementById("taskList");
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  render() {
    this.taskList.innerHTML = "";
    this.tasks.forEach((task) => {
      const div = document.createElement("div");
      div.className = "task";

      const paragraph = document.createElement("p");
      paragraph.textContent = task.text;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newText = prompt("Edit task:", task.text);
        if (newText) this.editTask(task.id, newText);
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => this.deleteTask(task.id);

      div.appendChild(paragraph);
      div.appendChild(editBtn);
      div.appendChild(deleteBtn);

      this.taskList.appendChild(div);
    });
  }

  addTask(text) {
    const id = Date.now().toString();
    const task = new Task(id, text);
    this.tasks.push(task);
    this.saveTasks();
    this.render();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.render();
  }

  editTask(id, newText) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) task.text = newText;
    this.saveTasks();
    this.render();
  }
}

//App
const taskManager = new TaskManager();
taskManager.render();

document.getElementById("taskForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("taskInput");
  taskManager.addTask(input.value);
  input.value = "";
});
