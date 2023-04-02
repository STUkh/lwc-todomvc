// These tests are examples to get you started on how how to test
// Lightning Web Components using the Jest testing framework.
//
// See the LWC Recipes Open Source sample application for many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes-oss

import { createElement } from 'lwc';
import companyTodoApp from 'company/todoApp';

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
    });

    it('should pass sanity check', () => {
        expect(todoAppEl).toBeInstanceOf(HTMLElement);
        expect(todoAppEl.tagName).toBe('COMPANY-TODO-APP');

        const todoListEl = todoAppShadowRoot.querySelector('company-todo-list');
        expect(todoListEl).toBeInstanceOf(HTMLElement);
    });
});
