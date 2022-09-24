const todos = []

const filters = {
    searchTitle: '',
    showFinished: false,
    showUnfinished: false,
}



const setFilters = (updates) => {
    if (typeof (updates.searchTitle) === 'string') {
        filters.searchTitle = updates.searchTitle
    }
    if (typeof (updates.showFinished) === 'boolean') {
        filters.showFinished = updates.showFinished
    }
    if (typeof (updates.showUnfinished) === 'boolean') {
        filters.showUnfinished = updates.showUnfinished
    }
}



const createTodo = (input) => {
    todos.push({
        title: input,
        completed: false
    })

}

//ex 6
const generateTodoDOM = (todoObj) => {

    //set up checkbox
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox['checked'] = todoObj.completed

    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const todoText = document.createElement('span')


    todoText.textContent = todoObj.title
    containerEl.appendChild(todoText)

    containerEl.appendChild(checkbox)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item_container')

    todoEl.appendChild(containerEl)

    //eventListener to checkbox
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todoObj.title)
        renderTodos(todos)
    })
    //remove button
    const removeBtn = document.createElement('button')
    removeBtn.textContent = 'remove'
    removeBtn.classList.add('button', 'button--text')
    todoEl.appendChild(removeBtn)
    removeBtn.addEventListener('click', () => {
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl
}


//ex 7 & 8
const renderTodos = (todos) => {

    console.log(todos)
    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(filters.searchTitle.toLowerCase())
    )
    if (filters.showFinished && filters.showUnfinished) {

    } else if (filters.showFinished) {
        filteredTodos.filter(checkCompleted)
    } else if (filters.showUnfinished === 'true') {
        filteredTodos.filter(!checkCompleted)
    }
    const todoList = document.querySelector('#todos')
    todoList.innerHTML = ''
    console.log(filteredTodos)

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
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


const checkCompleted = (todo) => {
    return todo.completed
}
//ex 9
const removeTodo = (title) => {

    const todoIndex = todos.findIndex((todo) => {
        return todo.title.toLowerCase() === title.toLowerCase()
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}


const toggleTodo = (title) => {
    const todo = todos.find((todo) => todo.title.toLowerCase() === title.toLowerCase())
    if (todo) {
        todo.completed = !todo.completed
    }
}


document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = e.target.elements.text.value.trim()
    if (input.length > 0) {


        createTodo(input)
        e.target.elements.text.value = ''
    }
    renderTodos(todos)
})

//add input event to input element
document.querySelector('#search-text').addEventListener('input', (e) => {

    setFilters({
        searchTitle: e.target.value,
    })
    renderTodos(todos)
})

//add change event to finished checkbox
document.querySelector('#show-finished').addEventListener('change', (e) => {
    setFilters({
        showFinished: e.target.checked
    })
    renderTodos(todos)
})

//add change event to unfinished checkbox
document.querySelector('#show-unfinished').addEventListener('change', (e) => {
    setFilters({
        showUnfinished: e.target.checked
    })
    renderTodos(todos)
})