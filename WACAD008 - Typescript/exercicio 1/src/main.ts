import FullList from "./model/FullList.js";
import ListItem from "./model/ListItem.js";
import ListTemplate from "./templates/ListTemplate.js";

const initApp = (): void => {

    const fullList = FullList.instance;
    const template = ListTemplate.instance;
    const form = document.getElementById("task-form") as HTMLFormElement;

    form.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault();

        const inputId = document.getElementById("task-id") as HTMLInputElement;
        const titleInput = document.getElementById("title") as HTMLInputElement;
        const descriptionInput = document.getElementById("description") as HTMLTextAreaElement;
        const dueDateInput = document.getElementById("due-date") as HTMLInputElement;
        const btnSave = document.getElementById("btn-save") as HTMLButtonElement;
        const titleText: string = titleInput.value.trim();

        if (!titleText.length) return;

        const dueDateText: string | undefined =
            dueDateInput.value || undefined;

        const descriptionText: string | undefined =
            descriptionInput.value || undefined;

        if (inputId.value) {
            const existingItem = fullList.list.find(
                item => item[0] === Number(inputId.value)
            );

            if (existingItem) {
                const updatedItem: ListItem = [
                    existingItem[0],
                    titleText,
                    existingItem[2],
                    dueDateText,
                    descriptionText
                ];

                fullList.editItem(updatedItem);
            }

            inputId.value = "";
            btnSave.textContent = "Adicionar";

        } else {
            const newItem: ListItem = [
                Date.now(),
                titleText,
                new Date().toLocaleString("pt-BR"),
                dueDateText,
                descriptionText
            ];

            fullList.addItem(newItem);
        }
        template.render(fullList);
        form.reset();
    });

    const btnCancel = document.getElementById("btn-cancel") as HTMLButtonElement;

    btnCancel.addEventListener("click", () => {
        form.reset();

        const inputId = document.getElementById("task-id") as HTMLInputElement;
        const btnSave = document.getElementById("btn-save") as HTMLButtonElement;

        inputId.value = "";
        btnSave.textContent = "Adicionar";
    });

    template.render(fullList);
}

document.addEventListener("DOMContentLoaded", initApp);