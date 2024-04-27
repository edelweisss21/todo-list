const addTaskButton = document.getElementById('button');
const listDiv = document.getElementById('list');
const todoTaskInput = document.getElementById('todo-task');

const addTask = () => {
	const taskValue = todoTaskInput.value;
	if (taskValue.trim() === '') return;

	const task = {
		id: Date.now(),
		text: taskValue,
		completed: false,
	};

	localStorage.setItem(`task_${task.id}`, JSON.stringify(task));

	const container = document.createElement('div');
	container.classList.add('todo-item', 'flex', 'items-center', 'gap-x-3');
	container.innerHTML = `
        <input id="todo-checkbox ${task.id}" class="todo-checkbox" type="checkbox" value="todo" />
        <label for="todo-checkbox ${task.id}" class="todo-text text-2xl max-w-7xl break-words text-center cursor-pointer">${taskValue}</label>
				<a href="#" class="remove-btn"><img src="distribution/img/trash.svg" alt="trash"></a>
    `;
	listDiv.append(container);
	todoTaskInput.value = '';

	const removeButton = container.querySelector('.remove-btn');
	console.log('removeButton', removeButton);
	removeButton.addEventListener('click', () => removeToDo(task.id));
};

const lineThroughText = e => {
	if (
		e.target.classList.contains('todo-text') ||
		e.target.classList.contains('todo-checkbox')
	) {
		const checkbox = e.target.classList.contains('todo-checkbox')
			? e.target
			: e.target.previousElementSibling;
		const todoItem = e.target.closest('.todo-item');
		const todoText = todoItem.querySelector('.todo-text');
		todoText.classList.toggle('line-through', checkbox.checked);
	}
};

const removeToDo = (e, taskId) => {
	localStorage.removeItem(`task_${taskId}`);
	const todoItem = document.querySelector(
		`.todo-item[data-task-id="${taskId}"]`
	);
	if (todoItem) {
		todoItem.remove();
	}
};

document.addEventListener('DOMContentLoaded', () => {
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (key.startsWith('task_')) {
			const task = JSON.parse(localStorage.getItem(key));
			addTaskToDOM(task);
		}
	}
});

const addTaskToDOM = task => {
	const container = document.createElement('div');
	container.classList.add('todo-item', 'flex', 'items-center', 'gap-x-3');
	container.dataset.taskId = task.id;
	container.innerHTML = `
        <input id="todo-checkbox ${
					task.id
				}" class="todo-checkbox" type="checkbox" value="todo" />
        <label for="todo-checkbox ${
					task.id
				}" class="todo-text text-2xl max-w-7xl break-words text-center cursor-pointer ${
		task.completed ? 'line-through' : ''
	}">${task.text}</label>
				<a href="#" class="remove-btn"><img src="distribution/img/trash.svg" alt="trash"></a>
    `;
	listDiv.append(container);
};

addTaskButton.addEventListener('click', addTask);
listDiv.addEventListener('click', lineThroughText);
