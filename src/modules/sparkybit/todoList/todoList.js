// available packages for import should be defined in lwc.config.json
import { LightningElement, api, track } from "lwc";

export default class SparkybitTodoList extends LightningElement {
  // DEFAULT PROPERTIES

  @api newTodo = '';
  @api visibility = 'all';
  @api editedTodo = null;

  // Watch and re-render on todo list mutations
  @track todos = [];

  // LIFE CYCLE METHODS
  
  constructor(...props) {
    super(...props);
    console.log('%c [Lifecycle]:', 'color: lightblue', 'constructor');
  }

  // Public properties are updated. Component is inserted into the DOM
  connectedCallback() {
    console.log('%c [Lifecycle]:', 'color: lightblue', 'connectedCallback');
  }

  // Initially when component's children are rendered
  // Also called on each update re-render. 
  renderedCallback() {
    console.log('%c [Lifecycle]:', 'color: lightblue', 'renderedCallback');
  }

  // Before component unmoount 💀
  disconnectedCallback() {
    console.log('%c [Lifecycle]:', 'color: lightblue', 'disconnectedCallback');
  }

  // STATIC DATA

  static filters = {
		all(todos) {
			return todos;
		},
		active(todos) {
			return todos.filter(todo => !todo.completed);
		},
		completed(todos) {
			return todos.filter(todo => todo.completed);
		}
	};

  // METHODS

  addTodo(event) {
    const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return undefined;
      }
      // TODO: Use a proper UUID instead of `Date.now()`.
      this.todos.push({
        id: Date.now(),
        title: value,
        completed: false,
        editing: false,
      });
      this.newTodo = '';
  }

  updateNewTodo(event) {
    if (event.target.value !== this.newTodo) {
      this.newTodo = event.target.value;
    }
  }

  onChangeNewTodo(event) {
    if (event.keyCode === 13) {
      this.addTodo(event);
    } else {
      this.updateNewTodo(event);
    }
  }

  changeVisibilityFilter(event) {
    event.preventDefault();
    const { visibility } = event.target.dataset;
    this.visibility = visibility;
  }

  switchAll(event) {
    event.preventDefault();
    const value = event.target.checked;
    this.filteredTodos.forEach(todo => {
      todo.completed = value;
    });
  }

  removeCompleted(event) {
    this.todos = App.filters.active(this.todos);
  }

  switchToDo(event) {
    const { todoId } = event.target;
    const todo = this.findTodoItemById(todoId);
    todo.completed = !todo.completed;
  }

  removeTodo(event) {
    let { todoId, todoIndex } = event.target;

    if(!todoId) {
      return undefined;
    }

    // search for correct index in not in All visibility mode
    if (this.visibility !== 'all') {
      todoIndex = this.todos.findIndex(todo => todo.id === todoId);
    }

    this.todos.splice(todoIndex, 1);
  }

  editTodo(event) {
    const { todoId } = event.target;
  
    const todo = this.findTodoItemById(todoId);
    // Save current edited todo item
    this.editedTodo = todo;
    this.editedTodo.editing = true;
  }

  cancelEdit(event) {
    const { oldTitle } = event.target;

    this.editedTodo.title = oldTitle;
    this.finishEditing();
  }

  saveEdit(event) {
    const { editableValue } = event.target;

    this.editedTodo.title = editableValue;
    this.finishEditing();
  }

  finishEditing() {
    this.editedTodo.editing = false;
    this.editedTodo = null;
  }

  findTodoItemById(todoId) {
    const todoItem = this.todos.find(todo => todo.id == todoId);
    return todoItem;
  }

  // GETTERS / SETTERS

  get remainingLength() {
    return App.filters.active(this.todos).length;
  }
  
  get remainingItemsText() {
    return `${this.remainingLength} ${this.pluralize('item', this.remainingLength)} left`
  }
  
  get filteredTodos() {
    return App.filters[this.visibility](this.todos);
  }

  get showClearCompleted() {
    return this.todos.length > this.remainingLength;
  }

  // Shame on you, Lightning...
  get allSelectedClass() { return this.visibility === 'all' ? 'selected' : ''; }
  get activeSelectedClass() { return this.visibility === 'active' ? 'selected' : ''; }
  get completedSelectedClass() { return this.visibility === 'completed' ? 'selected' : ''; }

  get allCompleted() {
    return this.filteredTodos.every(todo => todo.completed);
  }

  // HELPERS

  pluralize(word, count) {
    return word + (count === 1 ? '' : 's');
  }
}
