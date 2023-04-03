import { createElement } from 'lwc';
import companyTodoApp from '../todoApp';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from '../../../../utils/localStorage';

let appComponent;
let defaultTodos = [
    { id: 1, title: 'Test todo 1', completed: false },
    { id: 2, title: 'Test todo 2', completed: true },
    { id: 3, title: 'Test todo 3', completed: false }
];

jest.mock('../../../../utils/localStorage', () => ({
    getTodosFromLocalStorage: jest.fn().mockImplementation(() => defaultTodos),
    saveTodosToLocalStorage: jest.fn(),
}));


describe('company-todo-app', () => {
    let todoAppEl;
    let todoAppShadowRoot;

    beforeEach(() => {
        todoAppEl = createElement('company-todo-app', {
            is: companyTodoApp
        });

        todoAppShadowRoot = todoAppEl.shadowRoot;
        appComponent = todoAppShadowRoot.model;

        document.body.appendChild(todoAppEl);
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        // jest.resetAllMocks();
    });

    it('should pass sanity check', () => {
        expect(todoAppEl).toBeInstanceOf(HTMLElement);
        expect(todoAppEl.tagName).toBe('COMPANY-TODO-APP');

        const todoListEl = todoAppShadowRoot.querySelector('company-todo-list');
        expect(getTodosFromLocalStorage).toHaveBeenCalledTimes(1);
        expect(getTodosFromLocalStorage).toReturnWith(defaultTodos);
        expect(todoAppEl.todos).toEqual(defaultTodos);
        expect(todoAppEl.filter).toEqual('all');
        expect(todoListEl).toBeInstanceOf(HTMLElement);
    });

    it('should change filteredTodos when new filter applied', () => {
        todoAppEl.filter = 'all';
        expect(appComponent.filteredTodos).toEqual(defaultTodos);

        todoAppEl.filter = 'completed';
        expect(appComponent.filteredTodos).toEqual([{ completed: true, id: 2, title: "Test todo 2"}]);

        todoAppEl.filter = 'active';
        expect(appComponent.filteredTodos).toEqual([
            { completed: false, id: 1, title: "Test todo 1"},
            { completed: false, id: 3, title: "Test todo 3"},
        ]);
    });
});
