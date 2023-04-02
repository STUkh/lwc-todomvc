// todo-item.js
import { LightningElement, api } from 'lwc';
import classNames from 'classnames';

// Stateful component that accept particular "todo" from parent component
export default class TodoItem extends LightningElement {
  @api todo;
  isEditing = false;

  toggleComplete() {
    this.dispatchEvent(new CustomEvent('todo_toggle_complete', {
      bubbles: true, // Combination of this two params allow us
      composed: true, // to bypass even through shadow boundary
      detail: this.todo.id
    }));
  }

  removeTodo() {
    this.dispatchEvent(new CustomEvent('todo_remove_todo', {
      bubbles: true,
      composed: true,
      detail: this.todo.id
    }));
  }

  startEditing() {
    this.isEditing = true;
    setTimeout(() => { // Timeout to let element appear in DOM and then focus on it
      this.template.querySelector('.edit').focus();
    });
  }

  stopEditing() {
    this.isEditing = false;
  }

  updateTodo(event) {
    if (event.keyCode === 13) { // Enter key
      this.stopEditing();
      this.dispatchEvent(
        new CustomEvent('todo_update', {
          bubbles: true,
          composed: true,
          detail: { id: this.todo.id, title: event.target.value.trim() },
        })
      );
    } else if (event.keyCode === 27) { // ESC key
      this.stopEditing();
    }
  }

  get todoClasses() {
    return classNames({
      completed: this.todo.completed,
      editing: this.isEditing,
    });
  }

  get viewClasses() {
    return this.isEditing ? 'view hidden' : 'view';
  }

  get editClasses() {
    return this.isEditing ? 'edit' : 'edit hidden';
  }
}