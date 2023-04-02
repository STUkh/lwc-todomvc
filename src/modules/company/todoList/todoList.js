import { LightningElement, api } from 'lwc';

// Stateles component that accept "todos" from parent as parameter by @api decorator
export default class TodoList extends LightningElement {
  @api filtered_todos;
}
