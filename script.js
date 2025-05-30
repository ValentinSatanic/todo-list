const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Загрузка задач из localStorage при старте
window.onload = () => {
  const tasks = getTasks();
  tasks.forEach(renderTask);
};

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
  const li = document.createElement('li');
  li.textContent = task.text;
  if (task.completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    task.completed = !task.completed;
    saveTasks(updateTaskStatus(task.text, task.completed));
    li.classList.toggle('completed');
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Удалить';
  delBtn.onclick = (e) => {
    e.stopPropagation(); // Чтобы не вызывалось событие click на LI
    li.remove();
    saveTasks(getTasks().filter(t => t.text !== task.text));
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function updateTaskStatus(text, completed) {
  const tasks = getTasks();
  const updated = tasks.map(t => t.text === text ? {...t, completed} : t);
  return updated;
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = { text, completed: false };
  renderTask(task);

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  taskInput.value = '';
}
