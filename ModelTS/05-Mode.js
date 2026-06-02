// =================================== MODEL SECTION
export let proyects = [];
// <================ PROYECT FUNCTIONS ================>
export function newProyect(nameProyect, objProyect = "empty") {
    let nameP = nameProyect.trim();
    let objetivoP = objProyect.trim();
    if (!nameP) {
        return;
    }
    ;
    const proyect = {
        name: nameP,
        obj: objetivoP,
        tasks: [],
        priority: false,
        selected: false
    };
    proyects.unshift(proyect);
}
export function removeProyect(index) {
    proyects.splice(index, 1);
    console.log(proyects);
}
export function priorityProyect(proyect) {
    proyect.priority = !proyect.priority;
}
export function selectProyect(proyect) {
    if (!proyect)
        return;
    proyect.selected = true;
    console.log("proyecto seleccionado", proyect);
}
export function noSelectProyect(proyect) {
    proyect.selected = false;
}
// <================ TASKS FUNCTIONS ================>
export function newTask(proyecto, textInput) {
    const text = textInput;
    if (!proyecto) {
        console.log("Proyecto basio");
        return;
    }
    if (!text) {
        console.log("tarea basia");
        return;
    }
    const task = {
        text: text,
        done: false,
        priority: false
    };
    proyecto.tasks.unshift(task);
}
export function deleteTask(proyect, index) {
    proyect.tasks.splice(index, 1);
}
export function editTask(text, task) {
    const newText = text.trim();
    task.text = newText;
}
export function priorityTask(task) {
    task.priority = !task.priority;
}
// <================ SAVE/LOAD ================>
export function saveProyect() {
    localStorage.setItem("proyects", JSON.stringify(proyects));
}
export function loadProyects() {
    const saved = localStorage.getItem("proyects");
    if (saved) {
        proyects = JSON.parse(saved);
    }
}
//# sourceMappingURL=05-Mode.js.map