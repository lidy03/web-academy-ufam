"use strict";
var _a;
let task = [];
const form = document.getElementById("task-form");
const inputId = document.getElementById("task-id");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const dueDateInput = document.getElementById("due-date");
const taskList = document.getElementById("task-list");
const btnSave = document.getElementById("btn-save");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (inputId.value) {
        const index = task.findIndex(t => t[0] === Number(inputId.value));
        if (index !== -1) {
            task[index] = [
                Number(inputId.value),
                titleInput.value,
                task[index][2],
                dueDateInput.value || undefined,
                descriptionInput.value || undefined
            ];
        }
        inputId.value = "";
        btnSave.textContent = "Adicionar Tarefa";
    }
    else {
        task.push([
            Date.now(),
            titleInput.value,
            new Date().toLocaleString("pt-BR"),
            dueDateInput.value,
            descriptionInput.value
        ]);
    }
    renderTasks();
    form.reset();
});
(_a = document.getElementById("btn-cancel")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    form.reset();
    inputId.value = "";
    btnSave.textContent = "Adicionar Tarefa";
});
function renderTasks() {
    taskList.innerHTML = "";
    if (task.length === 0) {
        taskList.innerHTML = "<p>Não existem tarefas cadastradas.</p>";
        return;
    }
    task.forEach((t) => {
        var _a, _b;
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task-card");
        taskDiv.classList.add("lembrete-card");
        taskDiv.innerHTML = `
            <h4>${t[1]}</h4>
            <p><strong>Criado em:</strong> ${t[2]}</p>
            <p><strong>Data Limite:</strong> ${t[3] || "Sem data Limite"}</p>
            <p><strong>Descrição</strong> ${t[4] || "Sem descrição"}</p>
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Excluir</button>
        `;
        (_a = taskDiv.querySelector(".btn-delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            deleteTask(t[0]);
        });
        (_b = taskDiv.querySelector(".btn-edit")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            editTask(t[0]);
        });
        taskList.appendChild(taskDiv);
    });
}
function deleteTask(id) {
    task = task.filter(t => t[0] !== id);
    renderTasks();
}
function editTask(id) {
    var _a, _b;
    const t = task.find(t => t[0] === id);
    if (!t)
        return;
    inputId.value = String(t[0]);
    titleInput.value = t[1];
    dueDateInput.value = (_a = t[3]) !== null && _a !== void 0 ? _a : "";
    descriptionInput.value = (_b = t[4]) !== null && _b !== void 0 ? _b : "";
    btnSave.textContent = "Salvar Alterações";
}
