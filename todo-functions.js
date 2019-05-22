// fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

//todo search text renderer
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

        const incompleteTodos = filteredTodos.filter(function (todo){
            return !todo.completed
        })

    document.querySelector("#todos").innerHTML = ''
    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector("#todos").appendChild(generateTodoDOM(todo))
    })
}

// Save todos to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Delete Todo Button
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })  
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos(todos)
        renderTodos(todos, filters)
    }
}

//Toggle completed Todo
const toggleTodo = function (id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    }) 
    if (todoIndex > -1 ){
        todos[todoIndex].completed = !todos[todoIndex].completed
        saveTodos(todos)
        renderTodos(todos, filters)
    }
}

// get the DOM elements for an individual todo
const generateTodoDOM = function (todo) {

    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    const strikeText = document.createElement('strike')
    
    
    //setup checkbox element
    checkbox.setAttribute('type', 'checkbox')
    todoEl.appendChild(checkbox)
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', function () {
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
    removeButton.addEventListener('click', function(){
        removeTodo(todo.id)
    }) 
    
    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos){
    const summary = document.createElement("h3")
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}

