// todo-app.js
import { LightningElement, track, api } from 'lwc';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from '../../../utils/localStorage';

export default class TodoApp extends LightningElement {
	// Use @track decorator to make reactive entity on component level
  @api todos = getTodosFromLocalStorage() || [];
  @api filter = 'all'; // Use api to make component params testable
	
	// !!! Describe all methods here because LWC will render changes only when
	// !!! tracked entity reference is changed
  connectedCallback() {
		// Alternative way to store items to localStorage
    //window.addEventListener('beforeunload', () => {
    //  this.saveTodosToLocalStorage();
    //});
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