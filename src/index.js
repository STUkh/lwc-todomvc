import '@lwc/synthetic-shadow';
import { createElement } from 'lwc';
import SparkyTodoApp from 'company/todoApp';

const app = createElement('company-todo-app', { is: SparkyTodoApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
