// <====================== CONTROLLER ======================>

import {
    renderProyectAlmacen,
    createNewProyect,
    renderProyect,
} from "../ViewTS/ViewProyect/5-viewProyect.js";

import { editProyect } from "../ViewTS/ViewProyectMenu/05-proyectMenu.js"

import { menuView } from "../ViewTS/MenuView/05-menuView.js"

import {
    createtTaskProyect,
    renderTasksProyect,
} from "../ViewTS/ViewTask/5-viewTask.js";


import {
    proyects,
    newProyect,
    removeProyect,
    saveProyect,
    loadProyects,
    priorityProyect,
    selectProyect,
    noSelectProyect,

    newTask,
    deleteTask,
    editTask,
    priorityTask,
} from "../ModelTS/05-Mode.js"

import type { Proyect, Task } from "../ModelTS/05-Mode.js"

import { layoutElements } from "../5-TrayElements/5-trayElements.js"

const btnMenu = document.querySelector<HTMLButtonElement>("#menuBtn");
const btnnewProyect = document.querySelector<HTMLButtonElement>("#newProyect");

function update(){
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

function handleEditProyect(proyect: Proyect){
    editProyect(proyect,handleSelectProyect, handleSelectedProyect);
    update()
}

function handlepriorityProyect(proyect: Proyect){
    priorityProyect(proyect);
    update();
}

function handleRemoveProyect(index: number){
    removeProyect(index);
    update();
}

function handleSelectedProyect(proyect: Proyect | undefined){
    selectProyect(proyect);
}
function handleNoSelectedProyect(proyect: Proyect){
    noSelectProyect(proyect);
}

function handleCreate(){
    createNewProyect({
        showData:handleSaved,
        render: update
    });
}

function handleSaved(name: string, obj: string){ 
    newProyect(name,obj); 

    handleSelectProyect(proyects[0]);
    handleSelectedProyect(proyects[0]);
}


let currentProyect: Proyect | null = null
function handleSelectProyect(proyect: Proyect | undefined){
    currentProyect = proyect || null;
    renderProyect(proyect || null);
    update();
}

function rendertaskProyectfull(proyect: Proyect | null){
    renderTasksProyect(proyect,{
        update: update,
        onDeleteTask: handleDeleteTask,
        renderProyect: rendertaskProyectfull,
        saveEditTask: handleEditTask,
        onPriorityTask: handlePriority,

    })
    saveProyect()
}

function handleEditTask(texarea: HTMLTextAreaElement, task: Task){
    editTask(texarea.value, task);
    rendertaskProyectfull(currentProyect);
}

function handleDeleteTask(proyect: Proyect, index: number){
    deleteTask(proyect,index);
    rendertaskProyectfull(currentProyect);
}

function handlePriority(task: Task){
    priorityTask(task);
    rendertaskProyectfull(currentProyect);
}

function handleCreateTask(){
    createtTaskProyect(currentProyect,handleSaveTask)
}

function handleSaveTask(text: string){
    if(!currentProyect)return;

    newTask(currentProyect, text)
    rendertaskProyectfull(currentProyect);
}

function handleMenuView(){
    menuView();
}

btnnewProyect?.addEventListener("click",()=>{
    handleCreate();
    handleMenuView();
});


btnMenu?.addEventListener("click",()=>{handleMenuView()});
layoutElements.menuContainer?.addEventListener("click",()=>{handleMenuView()})
document.addEventListener("keydown",(e)=>{
    if(e.key === "Escape"){
        handleMenuView()
    }
})
const createTaskBtn = document.querySelector<HTMLButtonElement>("#createBtn");

createTaskBtn?.addEventListener("click",()=>{
    handleCreateTask()
})

loadProyects();
update();