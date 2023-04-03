// todo-app.js
import { LightningElement, track, api, wire } from 'lwc';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from '../../../utils/localStorage';
import { todoWireAdapter } from './todoApp.service';

export default class TodoApp extends LightningElement {
	// Use @api decorator to make reactive entity on component level and expose data to be testable
  @api filter = 'all'; // 
  @api todos = getTodosFromLocalStorage(); // initialize internal reactive value

  // Params for @wire adapter. Not used elsewhere in app
  @track skip = 0;
  @track limit = 5;

  // Fetch data from server. 2nd argument in param with $ prefix. Example: { type: '$filter' }
  @wire(todoWireAdapter, { skip: '$skip', limit: '$limit'})
  wireTodos({ error, data }) {
    if (data) {
        this.todos = data;
    } else if (error) {
        this.error = error;
    }
  }
	
	// !!! Describe all methods here because LWC will render changes only when
	// !!! tracked entity reference is changed
  connectedCallback() {
		// Alternative way to store items to localStorage
    // window.addEventListener('beforeunload', () => {
    //  this.saveTodosToLocalStorage();
    // });
  }

  constructor() {
    super();
    this.template.model = this; // Require for testing
  }

  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((todo) => !todo.completed);
      case 'completed':
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  handleFilterChange(event) {
    this.filter = event.detail;
  }

  handleToggleAll(event) {
    const completed = event.detail;
    this.todos = this.todos.map((todo) => ({
      ...todo,
      completed,
    }));
  }
	
	// Method to handle adding new item
  handleAddTodo(event) {
    this.todos = [
      ...this.todos,
      { id: Date.now(), title: event.detail, completed: false },
    ];

		saveTodosToLocalStorage(this.todos);
  }

  // Method to handle item completed state toggle
  handleToggleComplete(event) {
    this.todos = this.todos.map((todo) =>
      (todo.id === event.detail ? { ...todo, completed: !todo.completed } : todo)
    );

		saveTodosToLocalStorage(this.todos);
  }

	// Method to handle item removal
  handleRemoveTodo(event) {
    this.todos = this.todos.filter((todo) => todo.id !== event.detail);
		saveTodosToLocalStorage(this.todos);
  }
	
	// Method to clear all completed
  handleClearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
		saveTodosToLocalStorage(this.todos);
  }
	
	// Method to handle todo title update
  handleUpdateTodo(event) {
    this.todos = this.todos.map((todo) =>
      (todo.id === event.detail.id ? { ...todo, title: event.detail.title } : todo)
    );
		saveTodosToLocalStorage(this.todos);
  }
}