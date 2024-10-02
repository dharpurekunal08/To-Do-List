document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const searchInput = document.getElementById('search-input');
    const emptyListMessage = document.getElementById('empty-list-message');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos(todosToRender) {
        todoList.innerHTML = '';
        todosToRender.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            todoList.appendChild(li);
        });
        updateEmptyListMessage();
    }

    function updateEmptyListMessage() {
        if (todos.length === 0) {
            emptyListMessage.classList.remove('hidden');
        } else {
            emptyListMessage.classList.add('hidden');
        }
    }

    function addTodo(e) {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText !== '') {
            todos.push(todoText);
            saveTodos();
            renderTodos(todos);
            input.value = '';
        }
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos(todos);
    }

    function searchTodos() {
        const searchText = searchInput.value.toLowerCase();
        const filteredTodos = todos.filter(todo => 
            todo.toLowerCase().includes(searchText)
        );
        renderTodos(filteredTodos);
    }

    form.addEventListener('submit', addTodo);

    todoList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            deleteTodo(index);
        }
    });

    searchInput.addEventListener('input', searchTodos);

    renderTodos(todos);
});
