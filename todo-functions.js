// fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//todo search text renderer
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

        const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector("#todos").innerHTML = ''
    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => document.querySelector("#todos").appendChild(generateTodoDOM(todo)))
}

// Save todos to localStorage
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

// Delete Todo Button
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)  
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos(todos)
        renderTodos(todos, filters)
    }
}

//Toggle completed Todo
const toggleTodo =(id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id) 
    if (todoIndex > -1 ){
        todos[todoIndex].completed = !todos[todoIndex].completed
        saveTodos(todos)
        renderTodos(todos, filters)
    }
}

// get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {

    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    const strikeText = document.createElement('strike')
    
    
    //setup checkbox element
    checkbox.setAttribute('type', 'checkbox')
    todoEl.appendChild(checkbox)
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos(todos, filters)
    })

    //setup todo text
    todoText.textContent = todo.text
    if (todo.completed){
        strikeText.appendChild(todoText)
        todoEl.appendChild(strikeText)
    } else {
        todoEl.appendChild(todoText)
    }

    

    //setup button element
    removeButton.textContent = "x"
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => removeTodo(todo.id)) 
    
    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h3")
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

