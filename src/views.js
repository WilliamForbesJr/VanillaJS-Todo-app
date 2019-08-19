import { getFilters } from './filters'
import {toggleTodo, getTodos, removeTodo } from './todos'


const renderTodos = () => {
    const todoEl = document.querySelector("#todos")
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed

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
        renderTodos()
    })

    //setup todo text
    todoText.textContent = todo.text
    if (todo.completed) {
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
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

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

export {generateTodoDOM, renderTodos, generateSummaryDOM }