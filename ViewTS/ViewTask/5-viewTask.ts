//<=================== 5-viewTask.ts =======================>

import type { 
    Proyect, 
    SaveTask,
    RenderTasks,
} from "../../ModelTS/05-Mode.js";

import { priorityElement } from "../../ViewTS/Helper/05-trayHelper.js"

import { tasksElements } from "../../5-TrayElements/5-trayElements.js"

import {
    createOptionsTask,
    closeTasksOptions,
    tasksOptions
} from "../../ViewTS/ViewTaskMenu/05-taskMenu.js"

const { taskAlmacen } = tasksElements


export function renderTasksProyect(
    proyect: Proyect | null, 
    callbacks: RenderTasks
){
    if(proyect === null)return;
    
    if(!taskAlmacen){
        console.log("El almacen de tareas esta fallando");
        return;
    }
    
    taskAlmacen.replaceChildren();

    const fragment = document.createDocumentFragment()

    proyect.tasks.forEach((task,index)=>{
        const li = document.createElement("li");
        const p = document.createElement("p");
        const optionsTaskBtn = document.createElement("button");
        const optionsTaskBtnText = document.createElement("p");
        
        optionsTaskBtn.className = "options__TaskBtn";
        optionsTaskBtn.id = "optionsTaskBtn";
        optionsTaskBtnText.textContent = "...";
        optionsTaskBtn.append(optionsTaskBtnText);
        
        p.textContent = task.text;
        
        li.append(p,optionsTaskBtn);

        optionsTaskBtn.addEventListener("click",()=>{
            
            if(tasksOptions){
                const sameLi = li.contains(tasksOptions.active); 
                closeTasksOptions()
                
                if(sameLi){
                    console.log("Mismo botón, menú cerrado");
                    return;
                }
            }

            const menu = createOptionsTask({
                proyect:proyect,
                task:task,
                li:li,
                p:p,
                index:index,
                onDeleteTask:callbacks.onDeleteTask,
                update:callbacks.update,
                renderProyect:callbacks.renderProyect,
                saveEditTask:callbacks.saveEditTask,
                onPriorityTask:callbacks.onPriorityTask
            });

            tasksOptions.active = menu;
            li.append(menu);

        })

        if(task.priority){
            if(!taskAlmacen)return;

            taskAlmacen.prepend(li);
            priorityElement(li);
            return;
        }
    
        fragment.append(li)
    })
    taskAlmacen?.appendChild(fragment);
}

// tasks creator
export function createtTaskProyect(proyect: Proyect | null, onSave: SaveTask){
    if(proyect === null){
        console.log("proyect doesn't exist");
        return;
    }

    if(!taskAlmacen)return;

    let working = false
    
    const li = document.createElement("li");
    const textarea = document.createElement("textarea");

    li.appendChild(textarea);

    textarea.addEventListener("keydown",(e)=>{
        if(e.key === "Enter"){

            e.preventDefault()
            working = true
            const text = textarea.value.trim();

            onSave(text)
        }
    })  
    textarea.addEventListener("blur",()=>{
        if(working) return;
        const text = textarea.value.trim();

        onSave(text)

    })

    taskAlmacen.prepend(li);
    textarea.focus();
}
