// =================================== MODEL SECTION

export let proyects:Proyect[] = []

// INTERFACES

export interface Proyect {
    name: string,
    obj: string,
    tasks: Task[],
    priority:boolean,
    selected:boolean
}

export interface Task {
    text: string,
    done: boolean,
    priority: boolean
}

// <================ PROYECT TYPES ================>

export type CreateNewProyect = {
    showData: (name: string, obj: string)=> void,
    render: () => void;
}

export interface RenderProyectAlmacen {
    onSelecProyect: (proyect: Proyect | undefined) =>void,
    removeProyect: (index: number) => void,
    saveChanges: () => void,
    menuView: () => void,
    editProyect: (proyect: Proyect) => void,
    priorityProyect: (proyect: Proyect) => void,
    onSelected: (proyect: Proyect) => void,
    noSelectProyect: (proyect: Proyect) => void
}

export type RenderlayoutSeleted = (proyect: Proyect | undefined) => void;

export type CreateOptionsProyect = Omit<RenderProyectAlmacen, "onSelected" | "noSelectProyect"> & {
    proyect: Proyect,
    index: number,
}

export type EditProyect = (proyect: Proyect | undefined) => void;    


// <================ TASKS TYPES ================>

export interface RenderTasks {
    update: () => void,
    onDeleteTask: (proyect: Proyect, index: number) => void,
    renderProyect: (proyect: Proyect | null) => void,
    saveEditTask: (texarea: HTMLTextAreaElement, task: Task) => void,
    onPriorityTask: (task: Task) => void,
}

export type CreateOptionsTask = RenderTasks & {
    proyect: Proyect,
    task: Task,
    li: HTMLLIElement,
    p: HTMLElement,
    index: number
}

export type EditTask = Omit<CreateOptionsTask, "onPriorityTask" | "renderProyect">

export type SaveTask = (text: string) => void;    

export type TasksOptions = {
    active: HTMLDivElement | null
}

// <================ PROYECT FUNCTIONS ================>

export function newProyect (nameProyect: string, objProyect: string = "empty"){
    let nameP = nameProyect.trim();
    let objetivoP = objProyect.trim();

    if(!nameP){
        return;
    };
    const proyect: Proyect = {
        name:nameP,
        obj:objetivoP,
        tasks:[],
        priority:false,
        selected:false
    }

    proyects.unshift(proyect);
}

export function removeProyect(index: number){
    proyects.splice(index,1)
    console.log(proyects)
}

export function priorityProyect(proyect: Proyect){
    proyect.priority = !proyect.priority;
}

export function selectProyect(proyect: Proyect | undefined){
    if(!proyect)return;
    proyect.selected = true;
    console.log("proyecto seleccionado", proyect)
}

export function noSelectProyect(proyect: Proyect){
    proyect.selected = false;
}

// <================ TASKS FUNCTIONS ================>

export function newTask(proyecto: Proyect, textInput: string){
    const text = textInput;

    if(!proyecto){
        console.log("Proyecto basio")
        return;
    }

    if(!text){
        console.log("tarea basia");
        return;
    }

    const task: Task = {
        text:text,
        done:false,
        priority:false
    }

    proyecto.tasks.unshift(task)
}

export function deleteTask(proyect: Proyect, index: number){
    proyect.tasks.splice(index,1);
}

export function editTask(text: string, task: Task){
    const newText = text.trim();
    task.text = newText;
}

export function priorityTask(task: Task){
    task.priority = !task.priority;
}

// <================ SAVE/LOAD ================>

export function saveProyect (){
    localStorage.setItem("proyects", JSON.stringify(proyects));
}

export function loadProyects(){
    const saved = localStorage.getItem("proyects");

    if(saved){
        proyects = JSON.parse(saved);
    }
}