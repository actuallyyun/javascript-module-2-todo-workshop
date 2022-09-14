document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = e.target.elements.text.value.trim()
    if (input.length > 0) {


        createTodo(input)
        e.target.elements.text.value = ''
    }
    renderTodos(todos)
})


const todos = []

const createTodo = (input) => {
    todos.push(input)
}

//ex 6
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')


    todoText.textContent = todo
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item_container')

    todoEl.appendChild(containerEl)

    //remove button
    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'remove'
    removeBtn.classList.add('button', 'button--text')
    todoEl.appendChild(removeBtn)
    removeBtn.addEventListener('click', () => {
        removeTodo(todoText)
        renderTodos(todos)
    })

    return todoEl
}


//ex 7 & 8
const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''
    if (todos.length > 0) {


        todos.forEach(todo => {
            todoList.appendChild(generateTodoDOM(todo))

        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'There are no todos to show'
        todoList.appendChild(messageEl)
    }

}
renderTodos(todos)

//ex 9
const removeTodo = (todoEl) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.toLowerCase() === todoEl.textContent.toLowerCase()
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}


