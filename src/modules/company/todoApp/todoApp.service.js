import { getMockWireAdapter } from '../../../utils/wireAdapterMock.js';

export const todoWireAdapter = getMockWireAdapter(async (params) => {
    // Simple variant
    // const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    // return await response.json();

    // Another data source with a bit better content, but have to be slightly reformatted
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(`https://dummyjson.com/todos?${urlParams}`);
    const responseData = await response.json();
    // Slightly reformat response data
    return responseData.todos.map(t => ({ ...t, title: t.todo }));
});