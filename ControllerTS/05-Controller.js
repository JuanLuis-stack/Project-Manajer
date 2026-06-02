// <====================== CONTROLLER ======================>
var _a;
import { renderProyectAlmacen, createNewProyect, renderProyect, } from "../ViewTS/ViewProyect/5-viewProyect.js";
import { editProyect } from "../ViewTS/ViewProyectMenu/05-proyectMenu.js";
import { menuView } from "../ViewTS/MenuView/05-menuView.js";
import { createtTaskProyect, renderTasksProyect, } from "../ViewTS/ViewTask/5-viewTask.js";
import { proyects, newProyect, removeProyect, saveProyect, loadProyects, priorityProyect, selectProyect, noSelectProyect, newTask, deleteTask, editTask, priorityTask, } from "../ModelTS/05-Mode.js";
import { layoutElements } from "../5-TrayElements/5-trayElements.js";
const btnMenu = document.querySelector("#menuBtn");
const btnnewProyect = document.querySelector("#newProyect");
function update() {
    renderProyectAlmacen(proyects, {
        onSelecProyect: handleSelectProyect,
        removeProyect: handleRemoveProyect,
        saveChanges: update,
        menuView: handleMenuView,
        editProyect: handleEditProyect,
        priorityProyect: handlepriorityProyect,
        onSelected: handleSelectedProyect,
        noSelectProyect: handleNoSelectedProyect
    });
    rendertaskProyectfull(currentProyect);
    saveProyect();
}
function handleEditProyect(proyect) {
    editProyect(proyect, handleSelectProyect, handleSelectedProyect);
    update();
}
function handlepriorityProyect(proyect) {
    priorityProyect(proyect);
    update();
}
function handleRemoveProyect(index) {
    removeProyect(index);
    update();
}
function handleSelectedProyect(proyect) {
    selectProyect(proyect);
}
function handleNoSelectedProyect(proyect) {
    noSelectProyect(proyect);
}
function handleCreate() {
    createNewProyect({
        showData: handleSaved,
        render: update
    });
}
function handleSaved(name, obj) {
    newProyect(name, obj);
    handleSelectProyect(proyects[0]);
    handleSelectedProyect(proyects[0]);
}
let currentProyect = null;
function handleSelectProyect(proyect) {
    currentProyect = proyect || null;
    renderProyect(proyect || null);
    update();
}
function rendertaskProyectfull(proyect) {
    renderTasksProyect(proyect, {
        update: update,
        onDeleteTask: handleDeleteTask,
        renderProyect: rendertaskProyectfull,
        saveEditTask: handleEditTask,
        onPriorityTask: handlePriority,
    });
    saveProyect();
}
function handleEditTask(texarea, task) {
    editTask(texarea.value, task);
    rendertaskProyectfull(currentProyect);
}
function handleDeleteTask(proyect, index) {
    deleteTask(proyect, index);
    rendertaskProyectfull(currentProyect);
}
function handlePriority(task) {
    priorityTask(task);
    rendertaskProyectfull(currentProyect);
}
function handleCreateTask() {
    createtTaskProyect(currentProyect, handleSaveTask);
}
function handleSaveTask(text) {
    if (!currentProyect)
        return;
    newTask(currentProyect, text);
    rendertaskProyectfull(currentProyect);
}
function handleMenuView() {
    menuView();
}
btnnewProyect === null || btnnewProyect === void 0 ? void 0 : btnnewProyect.addEventListener("click", () => {
    handleCreate();
    handleMenuView();
});
btnMenu === null || btnMenu === void 0 ? void 0 : btnMenu.addEventListener("click", () => { handleMenuView(); });
(_a = layoutElements.menuContainer) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { handleMenuView(); });
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        handleMenuView();
    }
});
const createTaskBtn = document.querySelector("#createBtn");
createTaskBtn === null || createTaskBtn === void 0 ? void 0 : createTaskBtn.addEventListener("click", () => {
    handleCreateTask();
});
loadProyects();
update();
//# sourceMappingURL=05-Controller.js.map