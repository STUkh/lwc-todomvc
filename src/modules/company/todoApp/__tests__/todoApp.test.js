// These tests are examples to get you started on how how to test
// Lightning Web Components using the Jest testing framework.
//
// See the LWC Recipes Open Source sample application for many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes-oss

import { createElement } from 'lwc';
import companyTodoApp from '../todoApp';
import { getTodosFromLocalStorage, saveTodosToLocalStorage } from '../../../../utils/localStorage';

jest.mock('../../../../utils/localStorage', () => ({
    getTodosFromLocalStorage: jest.fn().mockImplementation(() => [
        { id: 1, title: 'Test todo 1', completed: false },
        { id: 2, title: 'Test todo 2', completed: true },
        { id: 3, title: 'Test todo 3', completed: false }
    ]),
    saveTodosToLocalStorage: jest.fn(),
}));


describe('company-todo-app', () => {
    let todoAppEl;
    let todoAppShadowRoot;

    beforeEach(() => {
        todoAppEl = createElement('company-todo-app', {
            is: companyTodoApp
        });

        document.body.appendChild(todoAppEl);
        todoAppShadowRoot = todoAppEl.shadowRoot;
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.resetAllMocks();
    });

    it('should pass sanity check', async () => {
        expect(todoAppEl).toBeInstanceOf(HTMLElement);
        expect(todoAppEl.tagName).toBe('COMPANY-TODO-APP');

        await Promise.resolve();

        const todoListEl = todoAppShadowRoot.querySelector('company-todo-list');
        expect(getTodosFromLocalStorage).toHaveBeenCalledTimes(1);
        expect(getTodosFromLocalStorage).toReturnWith([
            {"completed": false, "id": 1, "title": "Test todo 1"}, 
            {"completed": true, "id": 2, "title": "Test todo 2"}, 
            {"completed": false, "id": 3, "title": "Test todo 3"}
        ]);
        debugger;
        expect(todoAppEl.shadowRoot.filter).toEqual('all');
        expect(todoListEl).toBeInstanceOf(HTMLElement);
    });

    // it('renders correctly', async () => {
    //     // filter = 'completed';
    //     // todoAppEl.filter = filter;

    //     // Wait for the component to render
    //     await Promise.resolve();

    //     // Check that the component is rendering correctly
    //     debugger;
    //     expect(todoAppEl.todos).toEqual([]);
    //     expect(todoAppEl.filter).toBe('all');
    // });

    // it('handles filter change correctly', () => {
    //     // Set the initial values of the properties
    //     const todos = [            { id: 1, title: 'Test todo 1', completed: false },            { id: 2, title: 'Test todo 2', completed: true },            { id: 3, title: 'Test todo 3', completed: false },        ];
    //     const filter = 'all';

    //     // Create the component and set its properties
    //     const element = createElement('c-todo-app', { is: TodoApp });
    //     element.todos = todos;
    //     element.filter = filter;
    //     document.body.appendChild(element);

    //     // Wait for the component to render
    //     return Promise.resolve().then(() => {
    //         // Simulate a filter change event
    //         const filterButtons = element.shadowRoot.querySelectorAll('lightning-button');
    //         filterButtons.forEach(button => button.click());

    //         // Check that the component is filtering the todos correctly
    //         expect(element.filter).toBe('active');
    //         expect(element.filteredTodos).toEqual(element.todos.filter((todo) => !todo.completed));

    //         filterButtons[1].click();

    //         expect(element.filter).toBe('completed');
    //         expect(element.filteredTodos).toEqual(element.todos.filter((todo) => todo.completed));

    //         filterButtons[2].click();

    //         expect(element.filter).toBe('all');
    //         expect(element.filteredTodos).toEqual(element.todos);
    //     });
    // });
});
