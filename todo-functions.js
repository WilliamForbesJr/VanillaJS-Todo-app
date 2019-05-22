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

// get the DOM elements for an individual todo
const generateTodoDOM = function (todo) {

    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    
    //setup checkbox element
    checkbox.setAttribute('type', 'checkbox')
    todoEl.appendChild(checkbox)

    //setup todo text
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //setup button element
    removeButton.textContent = "x"
    todoEl.appendChild(removeButton) 
    
    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos){
    const summary = document.createElement("h3")
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}
