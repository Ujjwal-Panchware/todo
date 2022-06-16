const taskInput = document.querySelector('.input input'),
    tasks = document.querySelector('.tasks'),
    clearAll = document.querySelector('button'),
    filters = document.querySelectorAll('.filters .filter span')

let todos = JSON.parse(localStorage.getItem('todos')) || [],
    isUpdated = false, updateId

const editTodo = (id, title) => {
    isUpdated = true
    updateId = id
    taskInput.focus()
    taskInput.value = title
},
    deleteTodo = (index) => {
        todos.splice(index, 1)
        showTodo('all')
        localStorage.setItem('todos', JSON.stringify(todos))
    }

taskInput.addEventListener('keydown', e => {
    if (e.key == 'Enter' && taskInput.value !== '') {
        if (isUpdated == false) {
            todos.push({
                name: taskInput.value,
                status: 'pending'
            })
        } else {
            todos[updateId].name = taskInput.value
        }
        taskInput.value = ''
        localStorage.setItem('todos', JSON.stringify(todos))
        document.querySelectorAll('.task').forEach(item => item.remove())
        showTodo('all')
        filters[0].click()
        if (!isUpdated) tasks.scrollTop = tasks.scrollHeight
        isUpdated = false
    }
})

function showTodo(filter) {
    let task = ''
    if (todos) {
        todos.forEach((item, index) => {
            let isCompleted = item.status == 'completed' ? 'checked' : ''
            if (filter == item.status || filter === 'all') {
                task += `<div class="task">
                            <div class="task-name">
                                <input type="checkbox" id="${index}" onclick="updateStatus(this)" ${isCompleted}>
                                <label for="${index}" class="${isCompleted}">${item.name}</label>
                            </div>
                            <div id="menu">
                                <i class="fas fa-pen-fancy" onclick="editTodo(${index}, '${item.name}')"></i> 
                                <i class="fas fa-trash" onclick="deleteTodo(${index})"></i>
                            </div >
                        </div > `;
            }
        })
        tasks.innerHTML = task || `<span class="message">You don't have any tasks here</span>`
    }
}

showTodo('all')

clearAll.addEventListener('click', () => {
    todos = []
    localStorage.setItem('todos', JSON.stringify(todos))
    showTodo('all')
})

filters.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.active').classList.remove('active')
        item.classList.add('active')
        showTodo(item.id)
    })
})

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild

    if (selectedTask.checked) {
        taskName.classList.add('checked')
        todos[selectedTask.id].status = 'completed'
    } else {
        taskName.classList.remove('checked')
        todos[selectedTask.id].status = 'pending'
    }
    localStorage.setItem('todos', JSON.stringify(todos))
}

