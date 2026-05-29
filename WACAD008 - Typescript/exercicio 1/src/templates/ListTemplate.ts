import FullList from "../model/FullList.js";

interface DOMList {
    taskList: HTMLDivElement;
    clear(): void;
    render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
    taskList: HTMLDivElement;

    static instance: ListTemplate = new ListTemplate();

    private constructor() {
        this.taskList = document.getElementById("task-list") as HTMLDivElement;
    }

    clear(): void {
        this.taskList.innerHTML = '';
    }

    render(fullList: FullList): void {
        this.clear();

        if (fullList.list.length === 0) {
            this.taskList.innerHTML = "<p>Não existem tarefas cadastradas.</p>";
            return;
        }

        fullList.list.forEach(item => {
            const taskDiv = document.createElement("div");

            taskDiv.className = "task-card";

            taskDiv.innerHTML = `
                <h4>${item[1]}</h4>
                <p><strong>Criado em:</strong>${item[2]}</p>
                <p><strong>Data Limite:</strong>${item[3] || "Não foi definida"}</p>
                <p><strong>Descrição:</strong>${item[4] || "Não foi definida"}</p>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Excluir</button>
            `;

            const btnDelete = taskDiv.querySelector(".btn-delete") as HTMLButtonElement;

            btnDelete.addEventListener("click", () => {
                fullList.removeItem(item[0]);
                this.render(fullList);
            });

            const btnEdit = taskDiv.querySelector(".btn-edit") as HTMLButtonElement;

            btnEdit.addEventListener("click", () => {
                const inputId = document.getElementById("task-id") as HTMLInputElement;
                const titleInput = document.getElementById("title") as HTMLInputElement;
                const descriptionInput = document.getElementById("description") as HTMLTextAreaElement;
                const dueDateInput = document.getElementById("due-date") as HTMLInputElement;
                const btnSave = document.getElementById("btn-save") as HTMLButtonElement;

                inputId.value = String(item[0]);
                titleInput.value = item[1];
                dueDateInput.value = item[3] || "";
                descriptionInput.value = item[4] || "";
                btnSave.textContent = "Salvar Alterações";
            });

            this.taskList.append(taskDiv);
        });
    }
}