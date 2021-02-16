export const todoItemsMock = {
    "special": [
        { title: 'Coconut Milk', completed: false, id: 'coconut_milk' },
        { title: 'Baguette', completed: false, id: 'baguette' },
    ],
    "default": [
        { title: 'Milk', completed: false, id: 'milk' },
        { title: 'Bread', completed: false, id: 'bread' }
    ]
}


export class getTodosWireAdapter {
    constructor(dataCallback) {
        this.connected = false;
        this.dataCallback = dataCallback;
        this.type = 'default';
    }

    connect() {
        this.connected = true;
        this.provideTodoItemsWithType(this.type);
    }

    disconnect() {
        this.connected = false;
    }

    update(config) {
        if (this.type !== config.type) {
            this.type = config.type;
            this.provideTodoItemsWithType(this.type);
        }
    }

    provideTodoItemsWithType(id) {
        if (this.connected && this.type !== undefined) {
            console.log(this.type)
            const todoItems = todoItemsMock[this.type];

            if (todoItems) {
                this.dataCallback(todoItems);
            } else {
                this.dataCallback([]);
            }
        }
    }
}