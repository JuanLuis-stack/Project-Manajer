//<=================== 5-proyectMenu.ts =======================>
import { proyectElements, tasksElements } from "../../5-TrayElements/5-trayElements.js";
import { menuView } from "../MenuView/05-menuView.js";
import { closeMenu, priorityElement, } from "../Helper/05-trayHelper.js";
const { titleContainer, objContainer, createTaskBtn } = proyectElements;
const { taskAlmacen } = tasksElements;
let proyectActive = null;
function closeProjectOptionsMenu() {
    if (!proyectActive)
        return;
    proyectActive.remove();
    proyectActive = null;
    const existingLi = document.querySelector(".li__workingOn");
    if (!existingLi)
        return;
    existingLi.classList.remove("li__workingOn");
}
function positionProjectOptionsMenu(button, menu) {
    const buttonRect = button.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();
    let left = buttonRect.right + 8;
    let top = buttonRect.top;
    if (left + menuRect.width > window.innerWidth - 8) {
        left = buttonRect.left - menuRect.width - 8;
    }
    if (left < 8) {
        left = 8;
    }
    if (top + menuRect.height > window.innerHeight - 8) {
        top = window.innerHeight - menuRect.height - 8;
    }
    if (top < 8) {
        top = 8;
    }
    menu.style.left = left + "px";
    menu.style.top = top + "px";
}
export function openProjectOptionsMenu(button, menu, li) {
    if (!menu)
        return;
    const openProyectMenu = proyectActive && proyectActive.dataset.ownerKey === button.dataset.ownerKey;
    closeProjectOptionsMenu();
    if (openProyectMenu)
        return;
    li.classList.add("li__workingOn");
    menu.classList.add("floatingOptionsMenu");
    menu.dataset.ownerKey = button.dataset.ownerKey;
    document.body.append(menu);
    positionProjectOptionsMenu(button, menu);
    proyectActive = menu;
}
document.addEventListener("click", (e) => {
    closeMenu(proyectActive, e, ".proyect__optionsBtn", closeProjectOptionsMenu);
});
window.addEventListener("resize", closeProjectOptionsMenu);
document.addEventListener("scroll", closeProjectOptionsMenu, true);
export function createOptionsProyect(callbacks) {
    if (!callbacks)
        return;
    const div = document.createElement("div");
    div.className = "optionsBtn__menu";
    div.id = "optionsBtnMenu";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "<p>Remove</p><i class='bx bx-trash'></i>";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        callbacks.removeProyect(callbacks.index);
        callbacks.onSelecProyect(undefined);
        closeProjectOptionsMenu();
        proyectDOMRemove();
    });
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "<p>Edit</p><i class='bx bx-edit-alt'></i>";
    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        callbacks.editProyect(callbacks.proyect);
        taskAlmacen === null || taskAlmacen === void 0 ? void 0 : taskAlmacen.replaceChildren();
        closeProjectOptionsMenu();
        menuView();
    });
    const priorityBtn = document.createElement("button");
    if (callbacks.proyect.priority) {
        priorityElement(priorityBtn);
    }
    priorityBtn.innerHTML = "<p>Priority</p><i class='bx bx-flag'></i>";
    priorityBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        callbacks.priorityProyect(callbacks.proyect);
        callbacks.saveChanges();
        closeProjectOptionsMenu();
    });
    if (!createTaskBtn || !taskAlmacen)
        return;
    div.append(deleteBtn, editBtn, priorityBtn);
    return div;
}
function proyectDOMRemove() {
    titleContainer === null || titleContainer === void 0 ? void 0 : titleContainer.replaceChildren();
    objContainer === null || objContainer === void 0 ? void 0 : objContainer.replaceChildren();
    taskAlmacen === null || taskAlmacen === void 0 ? void 0 : taskAlmacen.replaceChildren();
}
export function editProyect(proyect, render, layoutSeleted) {
    if (!render || !layoutSeleted)
        return;
    const labelName = document.createElement("label");
    labelName.textContent = "Editar nombre:";
    labelName.htmlFor = "proyectTitle";
    const inputHeader = document.createElement("input");
    inputHeader.id = "nameProyect";
    inputHeader.maxLength = 25;
    inputHeader.value = proyect.name;
    const LabelObj = document.createElement("label");
    LabelObj.textContent = "Editar objetivo:";
    LabelObj.htmlFor = "objContainer";
    const textareaObj = document.createElement("textarea");
    textareaObj.id = "objProyect";
    textareaObj.value = proyect.obj;
    const saveBtn = document.createElement("button");
    saveBtn.className = "save__proyect";
    saveBtn.id = "saveProyect";
    saveBtn.textContent = "Save";
    saveBtn.addEventListener("click", () => {
        const name = inputHeader.value.trim();
        const obj = textareaObj.value.trim();
        proyect.name = name || proyect.name;
        proyect.obj = obj || proyect.obj;
        layoutSeleted(proyect);
        render(proyect);
        if (!createTaskBtn)
            return;
        createTaskBtn.style.display = "inline";
    });
    if (!titleContainer || !objContainer)
        return;
    titleContainer.replaceChildren(labelName, inputHeader);
    objContainer.replaceChildren(LabelObj, textareaObj, saveBtn);
}
//# sourceMappingURL=05-proyectMenu.js.map