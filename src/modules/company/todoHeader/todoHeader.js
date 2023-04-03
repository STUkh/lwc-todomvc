import { LightningElement, api } from 'lwc';

// Stateless component that emit event to parent
export default class TodoHeader extends LightningElement {
  @api todos;
  
  addTodo(event) {
    if (event.keyCode === 13 && event.target.value.trim() !== '') { // Enter key
      this.dispatchEvent(new CustomEvent('todo_add', { detail: event.target.value }));
      event.target.value = ''; // Clear input
    }
  }

  switchAll() {
    this.dispatchEvent(new CustomEvent('todo_switch_all', { detail: !this.allCompleted }));
  }

  get allCompleted() {
    return this.todos.every(todo => todo.completed);
  }
}