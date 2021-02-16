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

    provideTodoItemsWithType(type) {
        // Here can be performed any asynchronous stuff to fetch data
        // The only thing is to call dataCallback when data ready
        if (this.connected && type !== undefined) {
            const todoItems = todoItemsMock[type];
            setTimeout(() => {
                if (todoItems) {
                    this.dataCallback(todoItems);
                } else {
                    this.dataCallback(null);
                }
            }, 200); // Async action simulation
        }
    }
}