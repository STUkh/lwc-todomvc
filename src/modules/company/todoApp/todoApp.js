import { LightningElement, api } from "lwc";

export default class TodoApp extends LightningElement {
    @api listType = 'default'; // Change to 'special' to get some delicious

    switchDefaultListType() {
        this.listType = this.listType === 'default' ? 'special' : 'default';
    }
}