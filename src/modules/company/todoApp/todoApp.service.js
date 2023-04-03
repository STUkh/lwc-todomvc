import { getMockWireAdapter } from '../../../utils/wireAdapterMock.js';

export const todoWireAdapter = getMockWireAdapter(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
    return await response.json();
});