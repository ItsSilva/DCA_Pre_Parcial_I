class TaskItem extends HTMLElement {
    // Specify which attributes should be observed for changes
    static get observedAttributes() {
        return ['title', 'description', 'status'];
    }
    
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    // Lifecycle method called when the element is inserted into the DOM
    connectedCallback() {
        this.render();
        this.addEventListeners();
    }
    
    // Lifecycle method called when an observed attribute is changed
    attributeChangedCallback(propName, oldValue, newValue) {
        if(oldValue !== newValue) {
            this[propName] = newValue;
            this.render();
        }
    }
    
    // Method to toggle the status of the task
    toggleStatus() {
        const currentStatus = this.getAttribute('status');
        const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        this.setAttribute('status', newStatus);
        // Dispatch a custom event to notify parent of status change
        this.dispatchEvent(new CustomEvent('statusChanged', {
            detail: { newStatus },
            bubbles: true,
            composed: true
        }));
    }
    
    // Method to set up event listeners for the toggle button
    addEventListeners() {
        const toggleButton = this.shadowRoot.querySelector('.toggle-status');
        toggleButton.addEventListener('click', () => this.toggleStatus());
    }
    
    // Method to render the task item
    render() {
        const title = this.getAttribute('title') || 'No Title';
        const description = this.getAttribute('description') || 'No Description';
        const status = this.getAttribute('status') || 'pending';

        this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="./src/components/TaskItem/TaskItem.css">
            <div class="task-container ${status === 'completed' ? 'completed' : ''}">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="toggle-status">
                    ${status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
                </button>
            </div>
        `;
    }
}

customElements.define('task-item', TaskItem);
export default TaskItem;