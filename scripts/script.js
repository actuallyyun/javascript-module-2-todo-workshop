document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const input = e.target.elements.text.value.trim()
    console.log(input)


})


// const button= document.querySelector('.button')

// button.style.backgroundColor = 'green'

