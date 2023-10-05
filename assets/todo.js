function createTask(name) {
    var task = {
        name,
        guid: uuid(),
        done: false
    }

    addTask(task);

    var data = getStatus();
    data.tasks.push(task);

    saveStatus(data);
}

function addTask(task) {
    var before = $("#tasksPlace").html();

    var taskHtml = `
    <label class="task" for="${task.guid}" id="task-${task.guid}">
        <div class="taskInfos">        
            <input type="checkbox" onClick="toggleTaskDoneStatus('${task.guid}')" name="${task.guid}" id="${task.guid}" ${task.done ? 'checked=true' : null}">
            <label for="${task.guid}">${task.name}</label>
        </div>
        <button class="taskButtons" class="btn btn-primary" data-bs-toggle="modal" onClick="preDeleteTask('${task.guid}')" data-bs-target="#removeTaskModal"><i class='bx bx-trash'></i></button>
    </label>`;
    // onClick="deleteTask('${task.guid}'
    $("#tasksPlace").html(before + taskHtml);
}

function toggleTaskDoneStatus(taskId) {
    var data = getStatus();
    var task = data.tasks.find(task => task.guid === taskId);
    task.done = !task.done;

    saveStatus(data);
}

function preDeleteTask(taskId) {
    var data = getStatus();
    var task = data.tasks.find(task => task.guid === taskId);

    console.log('preDeleting ' + taskId);

    $("#removingTaskName").text(task.name + '?');
    $("#removingTaskSubmitButton").attr('onClick', `deleteTask('${taskId}')`)
}

function deleteTask(taskId) {
    var data = getStatus();
    data.tasks = data.tasks.filter(task => task.guid !== taskId);
    
    $(`#task-${taskId}`).remove();

    saveStatus(data);
}

function saveStatus(status) {
    window.localStorage.setItem('todoData', JSON.stringify(status));
}

function getStatus() {
    if (!window.localStorage.getItem('todoData')) {
        window.localStorage.setItem('todoData', JSON.stringify({ tasks: [] }));
    }

    return JSON.parse(window.localStorage.getItem('todoData'));
}

function start() {
    var data = getStatus();

    for (var d of data.tasks) {
        addTask(d);
    }
}

function uuid() {
    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);

            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    var crypto = window.crypto || window.msCrypto;
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}