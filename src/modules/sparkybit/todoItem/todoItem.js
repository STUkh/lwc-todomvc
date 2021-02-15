import { LightningElement, api, track } from "lwc";
import classNames from 'classnames';

export default class TodoItem extends LightningElement {
  @api completed;
  @api editing;
  @api todoId;
  @api todoIndex;
  @api title;
  @api oldTitle;
  @api editableValue;

  // Fires when data binded and props ready
  connectedCallback() {
    this.oldTitle = this.title;
  }

  // Fires when component and its children rendered
  renderedCallback() {
    this.editableEl = this.template.querySelector('input.edit');
  }

  handleSwitchTodo() {
    this.dispatchEvent(new CustomEvent('switchtodo'));
  }

  editTodo(event) {
    this.oldTitle = this.title;
    this.dispatchEvent(new CustomEvent('edittodo'));
    // Next tick after render into DOM
    setTimeout(() => {
      this.editableEl.focus();
    });
  }

  onEdit(event) {
    if (this.editing !== true) {
      return undefined;
    }

    if (event.keyCode === 27) {
      // ESC keycode
      return this.cancelEdit();
    } else if (event.keyCode === 13) {
      // ENTER keycode
      return this.saveEdit();
    }
    // Do nothing on typing
  }

  saveEdit() {
    if (!this.editing) {
      return undefined;
    }

    this.editableValue = this.editableEl.value.trim();

    if (this.editableValue) {
      this.dispatchEvent(new CustomEvent('saveedit'));
    } else {
      this.dispatchRemoveTodo();
    }

  }

  cancelEdit() {
    this.editableEl.value = this.oldTitle;
    this.dispatchEvent(new CustomEvent('canceledit'));
  }

  dispatchRemoveTodo() {
    this.dispatchEvent(new CustomEvent('removetodo'));
  }
  
  get todoClasses() {
    return classNames({
      completed: this.completed,
      editing: this.editing,
    });
  }
}