export class ItemsWireAdapter const getTodoItems = async function(todoListId) {
    console.log(arguments)
    if (todoListId === 'special') {
        return [
            { title: 'Coconut Milk', completed: false, id: 'coconut_milk' },
            { title: 'Baguette', completed: false, id: 'baguette' },
        ]
    };

    return [
        { title: 'Milk', completed: false, id: 'milk' },
        { title: 'Bread', completed: false, id: 'bread' }
    ]
}