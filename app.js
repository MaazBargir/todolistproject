let input = document.querySelector("#input");
let task_list = document.querySelector(".task-list");
let taskid = localStorage.getItem("taskid")
  ? parseInt(localStorage.getItem("taskid"))
  : 0;

function myClick() {
  let data = input.value.trim();
  if (!data) return;

  taskid++;
  localStorage.setItem("taskid", taskid);

  let taskData = { text: data };
  localStorage.setItem(`task-${taskid}`, JSON.stringify(taskData));

  createTaskElement(taskid, taskData);

  input.value = "";
}

function createTaskElement(id, taskData) {
  let li = document.createElement("li");
  li.id = `task-${id}`;
  li.innerHTML = `
    <p>Task : </p>
    <p>${taskData.text}</p>
    <button onClick="completed(${id})">Completed</button>
  `;
  task_list.appendChild(li);
}

function completed(id) {
  let task = document.querySelector(`#task-${id}`);
  if (task) {
    task.remove();
    localStorage.removeItem(`task-${id}`);
  }
}

window.onload = function () {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("task-")) {
      let taskData = JSON.parse(localStorage.getItem(key));
      let taskId = key.split("-")[1];
      createTaskElement(taskId, taskData);
    }
  });
};
