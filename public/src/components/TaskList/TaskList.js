import TaskItem from '../TaskItem/TaskItem.js';

class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.tasks = []; // Array to store all tasks
    }

    // Lifecycle method called when the element is inserted into the DOM
    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    // Method to add a new task to the list
    addTask(title, description) {
        const newTask = { title, description, status: 'pending' };
        this.tasks.push(newTask);
        this.renderTasks();
    }

    // Method to render all tasks in the list
    renderTasks() {
        const taskListContainer = this.shadowRoot.querySelector('.task-list');
        taskListContainer.innerHTML = ''; // Clear existing tasks

        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('task-item');
            taskItem.setAttribute('title', task.title);
            taskItem.setAttribute('description', task.description);
            taskItem.setAttribute('status', task.status);

            // Listen for status changes from individual TaskItems
            taskItem.addEventListener('statusChanged', (event) => {
                this.tasks[index].status = event.detail.newStatus;
                this.renderTasks(); // Re-render to update all tasks
            });

            taskListContainer.appendChild(taskItem);
        });
    }

    // Method to set up event listeners for the task form
    addEventListeners() {
        const form = this.shadowRoot.querySelector('.task-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const titleInput = this.shadowRoot.querySelector('#title');
            const descriptionInput = this.shadowRoot.querySelector('#description');
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();

            if (title && description) {
                this.addTask(title, description);
                titleInput.value = '';
                descriptionInput.value = '';
            }
        });
    }

    // Method to render the initial component structure
    render() {
        this.shadowRoot.innerHTML = `
            <div class="task-list-container">
                <form class="task-form">
                    <input type="text" id="title" placeholder="Task title" required>
                    <textarea id="description" placeholder="Task description" required></textarea>
                    <button type="submit">Add task</button>
                </form>
                <div class="task-list"></div>
            </div>
        `;

        this.renderTasks();
    }
}

customElements.define('task-list', TaskList);
export default TaskList;