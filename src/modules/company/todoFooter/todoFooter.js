import { LightningElement, api } from 'lwc';
import { pluralize } from '../../../utils/pluralize';

// Stateless component that accept activeTodoCount from parent component as param
export default class TodoFooter extends LightningElement {
  @api todos;
  @api filter;

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  get showClearCompleted() {
    return this.todos.some(todo => todo.completed);
  }

  handleAllFilter() {
    this.dispatchEvent(new CustomEvent('todo_filter_change', { detail: 'all' }));
  }

  handleActiveFilter(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('todo_filter_change', { detail: 'active' }));
  }

  handleCompletedFilter(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('todo_filter_change', { detail: 'completed' }));
  }

  handleClearCompleted(event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('todo_clear_completed'));
  }

  get itemsLeftText() {
    return `${pluralize('item', this.activeTodos.length)} left`; 
  }

  // Shame on you, Lightning...
  get allSelectedClass() { return this.filter === 'all' ? 'selected' : ''; }
  get activeSelectedClass() { return this.filter === 'active' ? 'selected' : ''; }
  get completedSelectedClass() { return this.filter === 'completed' ? 'selected' : ''; }
  
}