let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)


//Event Listeners
document.querySelector("#search-text").addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#new-todo").addEventListener('submit', (e) => {
    e.preventDefault()
    const newTodo = {
        id: uuidv4(),
        text: e.target.elements.todoName.value.trim(),
        completed: false
    }
    if(newTodo.text.length > 0) {
        todos.push(newTodo)
        saveTodos(todos)
        e.target.elements.todoName.value = ''
        renderTodos(todos, filters)
    } else {
        alert('You need to add text first!')
    }

})

document.querySelector("#hide-completed").addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})




