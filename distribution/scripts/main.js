const addTaskButton = document.getElementById('button');
const listDiv = document.getElementById('list');
const todoTaskInput = document.getElementById('todo-task');

const addTask = () => {
	const taskValue = todoTaskInput.value;
	if (taskValue.trim() === '') return;
	const container = document.createElement('div');
	container.classList.add('todo-item');
	container.innerHTML = `
        <input class="todo-checkbox" type="checkbox" value="todo" />
        <span class="todo-text text-2xl mb-5 text-center cursor-pointer">${taskValue}</span>
    `;
	listDiv.append(container);
	todoTaskInput.value = '';
};

addTaskButton.addEventListener('click', addTask);

listDiv.addEventListener('click', e => {
	if (
		e.target.classList.contains('todo-text') ||
		e.target.classList.contains('todo-checkbox')
	) {
		const checkbox = e.target.previousElementSibling;
		const todoText = e.target.closest('.todo-item').querySelector('.todo-text');
		if (checkbox) {
			checkbox.checked = !checkbox.checked;
			todoText.classList.toggle('line-through', checkbox.checked);
		}
	}
});
