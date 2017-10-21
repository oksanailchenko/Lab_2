function deleteTask(id) {
    fetch('tasks/' + id, {
        method: 'delete'
    })
        .then(show());
}

function show() {
    fetch('/tasks')
        .then(function (response) {
            return response.json();
        })
        .then(function (tasks) {
            console.log(tasks);
            var html = '<thead><tr><th>Ім"я</th><th>Опис</th><th>Дії</th></tr></thead><tbody>';
            for (var i = 0, len = tasks.length; i < len; i++) {
                var task = tasks[i];
                var deleteButton = '<button class=\'btn btn-danger\' onclick="deleteTask(\'' + task._id + '\')">Видалити</button>';
                var editButton = '<button class=\'btn btn-primary\' onClick="showEditWindow(\'' + task._id + '\',\'' + task.name + '\',\'' + task.description + '\')">Редагувати</button>'
                html += '<tr>' + '<td>' + tasks[i].name + '</td>' + '<td>' + tasks[i].description + '</td>' + '<td>' + deleteButton + editButton + '</td>' + '</tr>';
            }
            html += '</tbody>'
            document.getElementById('tasks').innerHTML = html;
        });
};

function createTask() {
    var taskName = document.getElementById('taskName').value;
    var taskValue = document.getElementById('taskDescription').value;
    fetch('tasks', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName, description: taskValue })
    })
        .then(show());
    return false;
};

function updateTask() {
    var taskId = document.getElementById('editTaskId').value;
    var taskName = document.getElementById('editTaskName').value;
    var taskDescription = document.getElementById('editTaskDescription').value;
    fetch('tasks/' + taskId, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: taskName, description: taskDescription })
    })
        .then(show());
    return false;
};

function showEditWindow(id, name, description) {
    document.getElementById("editWindow").style.display = "block";
    document.getElementById("addWindow").style.display = "none";
    document.getElementById("editWindow").scrollIntoView();
    document.getElementById("editTaskId").value = id;
    document.getElementById("editTaskName").value = name;
    document.getElementById("editTaskDescription").value = description;
}

show();