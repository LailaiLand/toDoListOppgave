const taskList = [
    {
        task: 'Finne Zaraikval',
        done: false,
        responsible: 'Jakhuilynn',
        dateNeeded: new Date("2022-12-25").toDateString(),
        dateCompleted: '',
    },
    {
        task: 'Lete Gjennom Brummundal',
        done: false,
        responsible: 'Huddril',
        dateNeeded: new Date("2022-12-11").toDateString(),
        dateCompleted: '',
    },
];
const group = ['Huddril', 'Jakhuilynn', 'Jihn', 'Kai', 'Molly']
const table = document.getElementById('app');
const dateDoneBy = [];
let reminder = '';


updateView();
function updateView() {
    let html = '';
    html += /*html*/ `
    <tr>
        <th>Gjøremål:</th>
        <th>Hvem:</th>
        <th>Senest:</th>
        <th>Ferdig?</th>
        <th>Fullført:</th>
        <th> </th> <th> </th>
    </tr>
    `;
    for (let i = 0; i < taskList.length; i++) {
        html += tableRow(i);
    }
    table.innerHTML = html + /*html*/`
    <tr>
        <td> <input type="text" id="addition" /></td>
        <td> <button onclick="addTask()">Legg til</button> </td>
    </tr>
    `;
}


function tableRow(i) {
    let item = taskList[i]
    const checkDone = item.done ? 'checked="checked"' : '';
    let row;
    if (!item.edit) row = /*html*/ `
        <tr>
            <td> ${item.task} </td>
            <td> ${item.responsible} </td>
            <td> ${item.dateNeeded} </td>
            <td> <input type="checkbox" onchange="boxCheck(${i})" ${checkDone} /> </td>
            <td> ${item.dateCompleted} </td>
            <td> <button onclick="editTask(${i})"> Endre </button> </td>
            <td> <button onclick="deleteTask(${i})"> Slett </button> </td>
        </tr>
    `;
    else {
        let people = comeTogether();
        row = /*html*/`<tr>
            <td> <input type="text" id="taskInput${i}" value="${item.task}"> </td>
            <td>
                <label for="selection${i}">Hvem skal gjøre det?</label>
                <select name="selection${i}" id="selection${i}">
                    ${people}
                </select> 
            </td>
            <td>
                <input onchange="changeDateDoneBy(${i})" id="dateInput${i}" type="date">
            </td>
            <td>  
                <button onclick="saveChanges('${i}')">Lagre</button>
            </td>
            <td>  
                ${reminder}
            </td>
            </tr>
    `}
    return row;
}
function boxCheck(i) {
    let item = taskList[i];
    item.done = !item.done;
    if (item.done) item.dateCompleted = new Date().toDateString();
    else if (!item.done) item.dateCompleted = '';
    updateView();
}
function editTask(i) {
    let item = taskList[i];
    item.edit = true;
    updateView();
}
function comeTogether() {
    let groupSelection;
    for (let i = 0; i < group.length; i++) {
        groupSelection += /*html*/`
        <option value="${i}">${group[i]}</option>
        `;
    }
    return groupSelection
}
function deleteTask(i) {
    taskList.splice(i)
    updateView()
}
function saveChanges(i) {
    let item = taskList[i];
    let newTask = document.getElementById('taskInput' + i).value;
    let selected = document.getElementById('selection' + i);
    let member = selected.options[selected.selectedIndex].text;
    if (!dateDoneBy[i]) {
        reminder = 'Velg Dato!';
        return updateView();
    }
    reminder = '';
    item.task = newTask;
    item.done = false;
    item.responsible = member;
    item.dateNeeded = dateDoneBy[i];
    item.dateCompleted = '';
    item.edit = false;
    updateView();
}
function changeDateDoneBy(i) {
    let input = document.getElementById('dateInput' + i).value;
    let newDate = new Date(input).toDateString();
    dateDoneBy[i] = newDate;
    console.log(dateDoneBy);
}
function addTask() {
    let additionalTask = document.getElementById('addition').value;
    taskList.push({
        task: additionalTask,
        edit: true
    })
    updateView();
}