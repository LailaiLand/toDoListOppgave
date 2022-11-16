const taskList = [
    {
        task: 'Finne Zaraikval',
        done: true,
        responsible: 'Jakhuilynn',
        dateNeeded: '',
        dateCompleted: '',
    },
    {
        task: 'Lete Gjennom Brummundal',
        done: true,
        responsible: 'Huddril',
        dateNeeded: '',
        dateCompleted: '',
    },
];
const table = document.getElementById('app');

updateView();
function updateView() {
    let html = '';
    html += /*html*/ `
    <tr>
        <th>Gjøremål:</th>
        <th>Ferdig?</th>
        <th>Senest:</th>
        <th>Fullført:</th>
        <th> </th> <th> </th>
    </tr>
    `;
    for (i = 0; i < taskList.length; i++) {
        html += tableRow(i);
    }
    table.innerHTML = html;
}


function tableRow(index) {
    let item = taskList[index]
    const checkDone = item.done ? 'checked="checked"' : '';
    let row = /*html*/ `
    <tr>
        <td> ${item.task} </td>
        <td> <input type="checkbox" onchange="boxCheck(${index})" ${checkDone} /> </td>
        <td> <button> Endre </button> </td>
        <td> <button> Slett </button> </td>
    </tr>
`;
return row;
}
function boxCheck(i){
    taskList[i].done = !taskList[i].done
}