import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    todos.push( {
        id: uuidv4(),
        text: text,
        completed: false
    })
        saveTodos()
}

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed
        saveTodos()
    }
}

loadTodos()

export{ getTodos, createTodo, removeTodo, toggleTodo } 