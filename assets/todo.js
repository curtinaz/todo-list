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
    <div class="task">
        <input type="checkbox" name="${task.guid}" id="${task.guid}">
        <label for="${task.guid}">${task.name}</label>
    </div>`;

    $("#tasksPlace").html(before + taskHtml);
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

    for(var d of data.tasks) {
        addTask(d);
    }
}

function uuid() {

    // Retorna um número randômico entre 0 e 15.
    function randomDigit() {

        // Se o browser tiver suporte às bibliotecas de criptografia, utilize-as;
        if (crypto && crypto.getRandomValues) {

            // Cria um array contendo 1 byte:
            var rands = new Uint8Array(1);

            // Popula o array com valores randômicos
            crypto.getRandomValues(rands);

            // Retorna o módulo 16 do único valor presente (%16) em formato hexadecimal
            return (rands[0] % 16).toString(16);
        } else {
            // Caso não, utilize random(), que pode ocasionar em colisões (mesmos valores
            // gerados mais frequentemente):
            return ((Math.random() * 16) | 0).toString(16);
        }
    }

    // A função pode utilizar a biblioteca de criptografia padrão, ou
    // msCrypto se utilizando um browser da Microsoft anterior à integração.
    var crypto = window.crypto || window.msCrypto;

    // para cada caracter [x] na string abaixo um valor hexadecimal é gerado via
    // replace:
    return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, randomDigit);
}