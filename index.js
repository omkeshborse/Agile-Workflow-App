import Kanban from "./kanban.js ";

const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const completed = document.querySelector(".cards.completed");
const taskbox = [todo, pending, completed];

function addTaskCard(task, index) {
  const element = document.createElement("form");
  element.className = "card";
  element.draggable = true;
  element.dataset.id = task.taskId ;
  element.innerHTML = `<input  value="${task.content}" type="text" name="task" autocomplete="off" disabled>
                <div>
                    <span class="task-id">#${task.taskId}</span>
                    <span>
                        <button class="edit" data-id="${task.taskId}"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button class="update hide" data-id="${task.taskId}"><i class="fa-solid fa-check"></i></button>
                        <button class="delete" data-id="${task.taskId}"><i class="fa-solid fa-trash-can"></i></button>
                    </span>
                </div>`;

 taskbox[index].appendChild(element)
}

Kanban.getAllTasks().forEach((tasks, index) => {
  tasks.forEach((task) => {
    addTaskCard(task, index);
  });
});
