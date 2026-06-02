//<==================== 05-taskMenu.ts ===================>
import { closeMenu, priorityElement } from "../Helper/05-trayHelper.js";
export let tasksOptions = {
    active: null
};
export function closeTasksOptions() {
    if (!tasksOptions.active)
        return;
    tasksOptions.active.remove();
    tasksOptions.active = null;
}
document.addEventListener("click", (e) => {
    closeMenu(tasksOptions.active, e, ".options__TaskBtn", closeTasksOptions);
});
export function createOptionsTask(callbacks) {
    const { proyect, task, li, p, index, onDeleteTask, update, renderProyect, saveEditTask, onPriorityTask } = callbacks;
    const div = document.createElement("div");
    div.className = "optionsTask__menu";
    div.id = "optionsTaskMenu";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<p>Remove</p><i class='bx bx-trash'></i>";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        onDeleteTask(proyect, index);
        update();
        setTimeout(() => {
            renderProyect(proyect);
        }, 1000);
    });
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "<p>Edit</p><i class='bx bx-edit-alt'></i>";
    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        editTask({
            task,
            li,
            p,
            index,
            update,
            onDeleteTask,
            proyect,
            saveEditTask
        });
    });
    const priorityBtn = document.createElement("button");
    if (task.priority) {
        priorityElement(priorityBtn);
    }
    priorityBtn.innerHTML = "<p>Priority</p><i class='bx bx-flag'></i>";
    priorityBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        onPriorityTask(task);
        update();
    });
    div.append(deleteBtn, editBtn, priorityBtn);
    return div;
}
function editTask(callback) {
    const { task, li, p, index, update, onDeleteTask, proyect, saveEditTask } = callback;
    const textarea = document.createElement("textarea");
    textarea.value = task.text;
    let working = false;
    li.replaceChild(textarea, p);
    textarea.focus();
    textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            working = true;
            const newText = textarea.value.trim();
            if (!newText) {
                onDeleteTask(proyect, index);
                update();
                return;
            }
            saveEditTask(textarea, task);
            update();
        }
    });
    textarea.addEventListener("blur", () => {
        if (working)
            return;
        const newText = textarea.value.trim();
        if (!newText) {
            onDeleteTask(proyect, index);
            update();
            return;
        }
        saveEditTask(textarea, task);
        update();
    });
}
//# sourceMappingURL=05-taskMenu.js.map