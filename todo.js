var list = [];
var filteredList = list.slice();
var main = document.createElement("main");
document.body.appendChild(main);
var listOfTasks = (function () {
    //Форма для новой задачи
    var newTask = function () {
        var newTaskForm = document.createElement("form");
        var input = document.createElement("input");
        input.type = "text";
        input.className = "text";
        newTaskForm.appendChild(input);
        var date = document.createElement("input");
        date.value = formatDate(new Date(), "-");
        date.type = "date";
        date.className = "date";
        newTaskForm.appendChild(date);
        var addButton = document.createElement("div");
        addButton.innerText = "Добавить";
        addButton.className = "add";
        addButton.onclick = function () {
            var task = new Task(input.value, date.value);
            if (input.value.length > 0) {
                list.push(task);
                addToHTMLList(task);
                input.value = "";
                console.log(list);
            }
        };
        newTaskForm.appendChild(addButton);
        main.appendChild(newTaskForm);
    };
    newTask();

    //Задаем элементы отображения задачи, которая уже есть в списке
    var addCheck = function (item) {   //добавляем чекбокс "сделано"
        var isDone = document.createElement("input");
        isDone.type = "checkbox";
        isDone.className = "check";
        isDone.checked = item.isDone;
        return isDone;
    };

    var addDeadline = function (item) {
        var deadline = document.createElement("div");   //добавляем deadline
        deadline.className = "deadline";
        deadline.innerText = item.deadline;
        return deadline;
    };

    var addText = function (item) {
        var text = document.createElement("div");   //добавляем текст
        if (item.text.length > 0) {
            text.innerText = item.text;
            return text;
        }
        return null;
    };

    var addDelete = function () {
        var deleteButton = document.createElement("img");   //добавляем крестик
        deleteButton.className = "delete";
        deleteButton.src = "images/delete-sign.png";
        return deleteButton;
    };

    var appendToTask = function (taskHTML, isDone, text, deadline, deleteButton) { //Соединяем все параметры
        taskHTML.appendChild(isDone);
        taskHTML.appendChild(text);
        taskHTML.appendChild(deadline);
        taskHTML.appendChild(deleteButton);
        return taskHTML;
    };

    //Добавление новой задачи в отображенный список задач
    var addToHTMLList = function (item) {
        var taskHTML = document.createElement("div");
        taskHTML.className = "item";
        var text = addText(item);
        var isDone = addCheck(item);
        isDone.addEventListener('change', function () {
            item.isDone = this.checked;
            console.log(list);
        });
        var deadline = addDeadline(item);
        var deleteButton = addDelete(item);
        deleteButton.onclick = function () { //Удаление задачи
            list.splice(list.indexOf(item), 1);
            tasksHTML.removeChild(taskHTML);
            console.log(list);
        };

        appendToTask(taskHTML, isDone, text, deadline, deleteButton);
        tasksHTML.appendChild(taskHTML);
    };

    var tasksHTML = document.createElement("div");
    tasksHTML.className = "tasks";
    main.appendChild(tasksHTML);

    return {
        addToTasks: function (item) {
            list.push(item);
        },
        show: function (arr) {
            while (tasksHTML.firstChild){
                tasksHTML.removeChild(tasksHTML.firstChild);
            }
            arr.forEach(function (item) {
                addToHTMLList(item);
            });
        }
    }
})();

function Task(text, deadline) {
    this.isDone = false;
    this.text = text;
    this.deadline = deadline;
}

Task.prototype.markDone = function () {
    this.isDone = true;
};

//Adding tasks
function formatDate(date, separator) {
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    return date.getFullYear() + separator + mm + separator + dd;
}

var first = new Task("to sleep well", formatDate(new Date(2019, 0, 12), "-"));
var second = new Task("to eat well", formatDate(new Date(2019, 0, 13), "-"));
listOfTasks.addToTasks(first);
listOfTasks.addToTasks(second);
var third = new Task("meow", formatDate(new Date(2019, 0, 15), "-"));
listOfTasks.addToTasks(third);
second.markDone();

listOfTasks.show(list);

//Добавление фильтров
var filters = function () {
    var filterForm = document.createElement("form");
    var select = document.createElement("select");
    var option1 = document.createElement("option");
    option1.text = "Показать сделанные";
    option1.value = "done";
    var option2 = document.createElement("option");
    option2.text = "Показать несделанные";
    option2.value = "undone";
    var option3 = document.createElement("option");
    option3.text = "Показать все";
    option3.value = "all";
    option3.selected = "select";

    select.addEventListener("change", function () {
        switch (select.value) {
            case 'done':
                filteredList = list.filter(function (item) {
                    return item.isDone === true;
                });
                break;
            case 'undone':
                filteredList = list.filter(function (item) {
                    return item.isDone === false;
                });
                break;
            case 'all':
                filteredList = list.slice();
                break;
            default:
                console.log("0");


        }
        console.log(filteredList);
        listOfTasks.show(filteredList);
    });
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    filterForm.appendChild(select);
    main.insertBefore(filterForm,main.firstChild);
};
filters();
