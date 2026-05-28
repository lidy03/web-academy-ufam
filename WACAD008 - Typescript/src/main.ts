type Task = [
    id: number,
    title: string,
    createdAt: string,
    dueDate?: string,
    description?: string
];

let task: Task[] = [];

const form = document.getElementById("task-form") as HTMLFormElement
const inputId = document.getElementById("task-id") as HTMLInputElement
const titleInput = document.getElementById("title") as HTMLInputElement
const descriptionInput = document.getElementById("description") as HTMLTextAreaElement
const dueDateInput = document.getElementById("due-date") as HTMLInputElement
const taskList = document.getElementById("task-list") as HTMLDivElement
const btnSave = document.getElementById("btn-save") as HTMLButtonElement

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
            ]
        }
        inputId.value = "";
        btnSave.textContent = "Adicionar Tarefa";
    } else {
    task.push([
        Date.now(),
        titleInput.value,
        new Date().toLocaleString("pt-BR"),
        dueDateInput.value,
        descriptionInput.value
        ])
    }
    renderTasks()
    form.reset()
});

document.getElementById("btn-cancel")?.addEventListener("click", () => {
    form.reset();
    inputId.value = "";
    btnSave.textContent = "Adicionar Tarefa";
})

function renderTasks(): void {
    taskList.innerHTML = "";

    if (task.length === 0) {
        taskList.innerHTML = "<p>Não existem tarefas cadastradas.</p>";
        return;
    }

    task.forEach((t) => {
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

        
        taskDiv.querySelector(".btn-delete")?.addEventListener("click", () => {
            deleteTask(t[0]);
        });

        taskDiv.querySelector(".btn-edit")?.addEventListener("click", () => {
            editTask(t[0]);
        });

        taskList.appendChild(taskDiv);
    });
}

function deleteTask(id: number): void {
    task = task.filter(t => t[0] !== id);
    renderTasks();
}

function editTask(id: number): void {
    const t = task.find(t => t[0] === id)
    if (!t) return
    inputId.value = String(t[0])
    titleInput.value = t[1]
    dueDateInput.value = t[3] ?? ""
    descriptionInput.value = t[4] ?? ""
    btnSave.textContent = "Salvar Alterações"
}


