import Kanban from "./kanban.js ";

const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const completed = document.querySelector(".cards.completed");
const taskbox = [todo, pending, completed];

function addTaskCard(task, index) {
  const element = document.createElement("form");
  element.className = "card";
  element.draggable = true;
  element.dataset.id = task.taskId;
  element.innerHTML = `<input  value="${task.content}" type="text" name="task" autocomplete="off" disabled="disabled">
                <div>
                    <span class="task-id">#${task.taskId}</span>
                    <span>
                        <button class="edit" data-id="${task.taskId}"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="update hide" data-id="${task.taskId}" data-column="${index}"><i class="fa-solid fa-check"></i></button>
                        <button class="delete" data-id="${task.taskId}"><i class="fa-solid fa-trash-can"></i></button>
                    </span>
                </div>`;

  taskbox[index].appendChild(element);
}

Kanban.getAllTasks().forEach((tasks, index) => {
  tasks.forEach((task) => {
    addTaskCard(task, index);
  });
});

const addForm = document.querySelectorAll("form.add");
addForm.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.task.value.trim()) {
      const task = Kanban.insertTask(
        parseInt(form.submit.dataset.id),
        form.task.value.trim()
      );
      addTaskCard(task, form.submit.dataset.id);
      form.reset();
    }
  });
});

taskbox.forEach((column) => {
  column.addEventListener("click", (e) => {
    e.preventDefault();
    const formInput =
      e.target.parentElement.parentElement.previousElementSibling;
    if (e.target.classList.contains("edit")) {
      formInput.removeAttribute("disabled");
      e.target.classList.add("hide");
      e.target.nextElementSibling.classList.remove("hide");
    }
    if (e.target.classList.contains("update")) {
      formInput.setAttribute("disabled", "disabled");
      e.target.classList.add("hide");
      e.target.previousElementSibling.classList.remove("hide");
      const taskId = e.target.dataset.id;
      const columnId = e.target.dataset.column;
      const content =
        e.target.parentElement.parentElement.previousElementSibling.value;
      Kanban.updateTask(taskId, { columnId, content });
    }

    if (e.target.classList.contains("delete")) {
      formInput.parentElement.remove();
      Kanban.deleteTask(parseInt(e.target.dataset.id));
    }
  });
});
