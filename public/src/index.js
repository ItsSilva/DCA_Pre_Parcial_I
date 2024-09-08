import * as components from './components/index.js';

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <section class="app-container"> 
                <h1>Task Manager</h1>
                <task-list></task-list>
            </section>
        `;
    }
}

customElements.define('app-container', AppContainer);
