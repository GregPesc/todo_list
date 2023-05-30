let todo_list = [];
let doing_list = [];
let done_list = [];

window.onload = function () {
    // richiesta get todo
    let xhr_todo = new XMLHttpRequest();
    xhr_todo.onreadystatechange = function () {
        if (xhr_todo.readyState == 4 && xhr_todo.status == 200) {
            todo_list = JSON.parse(xhr_todo.responseText);
            showTasks();
        }
    }
    xhr_todo.open("GET", "http://172.17.0.99:3456/todo", true);
    xhr_todo.send();

    // richiesta get doing
    let xhr_doing = new XMLHttpRequest();
    xhr_doing.onreadystatechange = function () {
        if (xhr_doing.readyState == 4 && xhr_doing.status == 200) {
            doing_list = JSON.parse(xhr_doing.responseText);
            showTasks();
        }
    }
    xhr_doing.open("GET", "http://172.17.0.99:3456/doing", true);
    xhr_doing.send();

    // richiesta get done
    let xhr_done = new XMLHttpRequest();
    xhr_done.onreadystatechange = function () {
        if (xhr_done.readyState == 4 && xhr_done.status == 200) {
            done_list = JSON.parse(xhr_done.responseText);
            showTasks();
        }
    }
    xhr_done.open("GET", "http://172.17.0.99:3456/done", true);
    xhr_done.send();
};

function saveTasks() {
    // richiesta post todo
    let req_todo = new XMLHttpRequest();
    req_todo.onreadystatechange = function () {
        if (req_todo.readyState == 4 && req_todo.status == 200) {
            console.log("Salvataggio effettuato");
        }
    }
    req_todo.open("POST", "http://172.17.0.99:3456/todo", true);
    req_todo.setRequestHeader("Content-type", "application/json");
    req_todo.send(JSON.stringify(todo_list));

    // richiesta post doing
    let req_doing = new XMLHttpRequest();
    req_doing.onreadystatechange = function () {
        if (req_doing.readyState == 4 && req_doing.status == 200) {
            console.log("Salvataggio effettuato");
        }
    }
    req_doing.open("POST", "http://172.17.0.99:3456/doing", true);
    req_doing.setRequestHeader("Content-type", "application/json");
    req_doing.send(JSON.stringify(doing_list));

    // richiesta post done
    let req_done = new XMLHttpRequest();
    req_done.onreadystatechange = function () {
        if (req_done.readyState == 4 && req_done.status == 200) {
            console.log("Salvataggio effettuato");
        }
    }
    req_done.open("POST", "http://172.17.0.99:3456/done", true);
    req_done.setRequestHeader("Content-type", "application/json");
    req_done.send(JSON.stringify(done_list));
}

function addTask() {
    // input dati
    let nome_task = prompt("Nome task");
    let descrizione_task = prompt("Descrizione task");
    let id_task = prompt("ID task");

    let task = {
        name: nome_task,
        description: descrizione_task,
        id: id_task
    };
    todo_list.push(task);
    showTasks();
}

function startTask() {
    let input_id = prompt("ID task");
    let i = 0;
    for (let task of todo_list) {
        if (input_id == task.id) {
            doing_list.push(task);
            todo_list.splice(i, 1);
        };
        i++;
    };
    showTasks();
}

function endTask() {
    let input_id = prompt("ID task");
    let i = 0;
    for (let task of doing_list) {
        if (input_id == task.id) {
            done_list.push(task);
            doing_list.splice(i, 1);
        };
        i++;
    };
    showTasks();
}

function deleteTask() {
    let input_id = prompt("ID task");
    let i = 0;
    for (let task of done_list) {
        if (input_id == task.id) {
            done_list.splice(i, 1);
        };
        i++;
    };
    showTasks();
}

function showTasks() {
    let lista_HTML = "<ul>";
    let todo_list_div = document.getElementById("todolist");
    for (let task of todo_list) {
        lista_HTML = lista_HTML + "<li> Nome: " + task.name + " <br> Descrizione: " + task.description + "<br> ID: " + task.id + "</li>";
    };
    lista_HTML = lista_HTML + "</ul>";
    todo_list_div.innerHTML = lista_HTML;

    lista_HTML = "<ul>";
    let doing_list_div = document.getElementById("doinglist");
    for (let task of doing_list) {
        lista_HTML = lista_HTML + "<li> Nome: " + task.name + " <br> Descrizione: " + task.description + "<br> ID: " + task.id + "</li>";
    };
    lista_HTML = lista_HTML + "</ul>";
    doing_list_div.innerHTML = lista_HTML;

    lista_HTML = "<ul>";
    let done_list_div = document.getElementById("donelist");
    for (let task of done_list) {
        lista_HTML = lista_HTML + "<li> Nome: " + task.name + " <br> Descrizione: " + task.description + "<br> ID: " + task.id + "</li>";
    };
    lista_HTML = lista_HTML + "</ul>";
    done_list_div.innerHTML = lista_HTML;
}