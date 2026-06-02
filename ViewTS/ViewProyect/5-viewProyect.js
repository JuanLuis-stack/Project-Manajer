//<==================== 5-viewProyect.ts ===================>
import { proyectElements, tasksElements, } from "../../5-TrayElements/5-trayElements.js";
import { openProjectOptionsMenu, createOptionsProyect } from "../../ViewTS/ViewProyectMenu/05-proyectMenu.js";
const { proyectAlmacen, createTaskBtn, titleContainer, objContainer, } = proyectElements;
const { taskAlmacen } = tasksElements;
export function renderProyect(proyect) {
    var _a, _b;
    if (!proyect) {
        console.log("Proyecto basio");
        return;
    }
    if (!proyectElements.objContainer || !proyectElements.titleContainer)
        return;
    if (!proyectElements.createTaskBtn || !proyectElements.empty)
        return;
    if (!proyect) {
        console.error("Proyecto no encontrado o vacío");
        (_a = proyectElements.titleContainer) === null || _a === void 0 ? void 0 : _a.replaceChildren();
        (_b = proyectElements.objContainer) === null || _b === void 0 ? void 0 : _b.replaceChildren();
        proyectElements.createTaskBtn.style.display = "none";
        proyectElements.empty.style.display = "flex";
        return;
    }
    proyectElements.empty.style.display = "none";
    proyectElements.createTaskBtn.style.display = "inline";
    proyectElements.createTaskBtn.style.backgroundColor = "#fff";
    const data = renderHeaderProyect(proyect.name, proyect.obj);
    proyectElements.titleContainer.replaceChildren(data.name);
    proyectElements.objContainer.replaceChildren(data.obj);
}
function renderHeaderProyect(name, obj) {
    const h1 = document.createElement("h1");
    const p = document.createElement("p");
    h1.textContent = name;
    p.textContent = obj;
    return { name: h1, obj: p };
}
export function createNewProyect(callBack) {
    const labelName = document.createElement("label");
    labelName.textContent = "Nombre:";
    labelName.htmlFor = "proyectTitle";
    const inputHeader = document.createElement("input");
    inputHeader.id = "nameProyect";
    inputHeader.placeholder = "Escribe el nombre de tu nuevo proyecto...";
    inputHeader.maxLength = 25;
    const LabelObj = document.createElement("label");
    LabelObj.textContent = "Objetivo:";
    LabelObj.htmlFor = "objContainer";
    const textareaObj = document.createElement("textarea");
    textareaObj.id = "objProyect";
    textareaObj.placeholder = "Escribe el objetivo del nuevo proyect";
    const saveBtn = document.createElement("button");
    saveBtn.className = "save__proyect";
    saveBtn.id = "saveProyect";
    saveBtn.textContent = "Save";
    if (!createTaskBtn)
        return;
    createTaskBtn.style.display = "none";
    saveBtn.addEventListener("click", () => {
        const name = inputHeader.value;
        const obj = textareaObj.value;
        callBack.showData(name, obj);
        callBack.render();
    });
    if (!proyectElements.titleContainer || !proyectElements.objContainer)
        return;
    proyectElements.titleContainer.replaceChildren(labelName, inputHeader);
    proyectElements.objContainer.replaceChildren(LabelObj, textareaObj, saveBtn);
    taskAlmacen === null || taskAlmacen === void 0 ? void 0 : taskAlmacen.replaceChildren();
}
export function renderProyectAlmacen(proyects, callbacks) {
    var _a;
    proyectAlmacen === null || proyectAlmacen === void 0 ? void 0 : proyectAlmacen.replaceChildren();
    const { onSelecProyect, removeProyect, saveChanges, menuView, editProyect, priorityProyect, onSelected, noSelectProyect } = callbacks;
    const fragment = document.createDocumentFragment();
    proyects.forEach((proyect, index) => {
        var _a;
        if (!proyect)
            return;
        const li = document.createElement("li");
        if (proyect.selected) {
            li.classList.add("selectedProyect");
        }
        noSelectProyect(proyect);
        const titleProyect = document.createElement("p");
        const optionsLiBtn = document.createElement("button");
        const optionsLiBtntext = document.createElement("p");
        optionsLiBtn.className = "proyect__optionsBtn";
        optionsLiBtn.id = "ProyectOptionsBtn";
        optionsLiBtntext.textContent = "...";
        optionsLiBtn.dataset.ownerKey = `project-${index}`;
        optionsLiBtn.append(optionsLiBtntext);
        titleProyect.textContent = proyect.name;
        li.addEventListener("click", () => {
            onSelected(proyect);
            onSelecProyect(proyect);
            menuView();
        });
        optionsLiBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const existingLi = document.querySelector(".li__workingOn");
            const existingMenu = document.querySelector(".optionsBtn__menu");
            if (existingMenu && existingLi) {
                const sameLi = li.contains(existingMenu);
                existingMenu.remove();
                existingLi.classList.remove("li__workingOn");
                if (sameLi) {
                    return;
                }
            }
            openProjectOptionsMenu(optionsLiBtn, createOptionsProyect({
                proyect: proyect,
                index: index,
                removeProyect: removeProyect,
                onSelecProyect: onSelecProyect,
                editProyect: editProyect,
                saveChanges: saveChanges,
                menuView: menuView,
                priorityProyect: priorityProyect
            }), li);
            li.classList.add("li__workingOn");
        });
        li.append(titleProyect, optionsLiBtn);
        if (proyect.priority) {
            (_a = proyectElements.proyectAlmacen) === null || _a === void 0 ? void 0 : _a.prepend(li);
            li.classList.add("priorityProyect");
            return;
        }
        fragment.append(li);
    });
    (_a = proyectElements.proyectAlmacen) === null || _a === void 0 ? void 0 : _a.appendChild(fragment);
}
//# sourceMappingURL=5-viewProyect.js.map