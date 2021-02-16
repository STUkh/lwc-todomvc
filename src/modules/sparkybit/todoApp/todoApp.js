import { LightningElement, api, wire } from "lwc";
// Mock wire adapter to show default data
import { getTodosWireAdapter } from '../../../utils/mockApi';

export default class TodoApp extends LightningElement {
    @api listType = 'default'; // Change to 'special' to get some delicious
    @wire(getTodosWireAdapter, { type: '$listType'}) todoItems;

    switchDefaultListType() {
        this.listType = this.listType === 'default' ? 'special' : 'default';
    }
}