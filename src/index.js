import { createElement } from 'lwc';
import SparkyTodoApp from 'sparkybit/todoApp';

const app = createElement('sparkybit-todo-app', { is: SparkyTodoApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
