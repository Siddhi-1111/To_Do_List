document.getElementById('addBtn').addEventListener('click', addTask);

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const date = new Date();
    const timeStamp = date.toLocaleString();

    const li = createTaskElement(taskText, timeStamp, false);
    document.getElementById('pendingList').appendChild(li);

    input.value = "";
}

function createTaskElement(text, timeStamp, isCompleted) {
    const li = document.createElement('li');

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `<span class="task-text">${text}</span><small>Added: ${timeStamp}</small>`;

    if (isCompleted) {
        taskInfo.querySelector('.task-text').classList.add('completed');
    }

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'complete-btn';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';

    completeBtn.onclick = function() {
        markComplete(li);
    };

    editBtn.onclick = function() {
        editTask(taskInfo);
    };

    deleteBtn.onclick = function() {
        li.remove();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(actions);

    return li;
}

function markComplete(taskElement) {
    const taskText = taskElement.querySelector('.task-text');
    taskText.classList.add('completed');

    const completedDate = new Date().toLocaleString();
    const smallTag = document.createElement('small');
    smallTag.textContent = 'Completed: ' + completedDate;
    taskElement.querySelector('.task-info').appendChild(smallTag);

    document.getElementById('completedList').appendChild(taskElement);
}

function editTask(taskInfo) {
    const taskTextElement = taskInfo.querySelector('.task-text');
    const currentText = taskTextElement.textContent;
    const newText = prompt("Edit your task:", currentText);

    if (newText !== null && newText.trim() !== "") {
        taskTextElement.textContent = newText.trim();
    }
}
