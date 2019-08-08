// fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    return todosJSON ? JSON.parse(todosJSON) : []
}

//todo search text renderer
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector("#todos")
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

        const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'You have no Todos left!'
        todoEl.appendChild(messageEl)
    }

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

    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    const strikeText = document.createElement('strike')
    
    
    //setup checkbox element
    checkbox.setAttribute('type', 'checkbox')
    containerEl.appendChild(checkbox)
    checkbox.checked = todo.completed
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos(todos, filters)
    })

    //setup todo text
    todoText.textContent = todo.text
    if (todo.completed){
        strikeText.appendChild(todoText)
        containerEl.appendChild(strikeText)
    } else {
        containerEl.appendChild(todoText)
    }

    //Setup Container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)
    
    //setup button element
    removeButton.textContent = "remove"
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => removeTodo(todo.id)) 
  



    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h3")
    summary.classList.add('list-title')
    if (incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    }
    return summary
}

