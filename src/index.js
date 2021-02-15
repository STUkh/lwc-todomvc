import { createElement } from 'lwc';
import SparkybitTodoApp from 'sparkybit/todoApp';

const app = createElement('my-app', { is: SparkybitTodoApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
