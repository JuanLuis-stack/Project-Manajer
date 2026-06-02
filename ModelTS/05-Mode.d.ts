export declare let proyects: Proyect[];
export interface Proyect {
    name: string;
    obj: string;
    tasks: Task[];
    priority: boolean;
    selected: boolean;
}
export interface Task {
    text: string;
    done: boolean;
    priority: boolean;
}
export type CreateNewProyect = {
    showData: (name: string, obj: string) => void;
    render: () => void;
};
export interface RenderProyectAlmacen {
    onSelecProyect: (proyect: Proyect | undefined) => void;
    removeProyect: (index: number) => void;
    saveChanges: () => void;
    menuView: () => void;
    editProyect: (proyect: Proyect) => void;
    priorityProyect: (proyect: Proyect) => void;
    onSelected: (proyect: Proyect) => void;
    noSelectProyect: (proyect: Proyect) => void;
}
export type RenderlayoutSeleted = (proyect: Proyect | undefined) => void;
export type CreateOptionsProyect = Omit<RenderProyectAlmacen, "onSelected" | "noSelectProyect"> & {
    proyect: Proyect;
    index: number;
};
export type EditProyect = (proyect: Proyect | undefined) => void;
export interface RenderTasks {
    update: () => void;
    onDeleteTask: (proyect: Proyect, index: number) => void;
    renderProyect: (proyect: Proyect | null) => void;
    saveEditTask: (texarea: HTMLTextAreaElement, task: Task) => void;
    onPriorityTask: (task: Task) => void;
}
export type CreateOptionsTask = RenderTasks & {
    proyect: Proyect;
    task: Task;
    li: HTMLLIElement;
    p: HTMLElement;
    index: number;
};
export type EditTask = Omit<CreateOptionsTask, "onPriorityTask" | "renderProyect">;
export type SaveTask = (text: string) => void;
export type TasksOptions = {
    active: HTMLDivElement | null;
};
export declare function newProyect(nameProyect: string, objProyect?: string): void;
export declare function removeProyect(index: number): void;
export declare function priorityProyect(proyect: Proyect): void;
export declare function selectProyect(proyect: Proyect | undefined): void;
export declare function noSelectProyect(proyect: Proyect): void;
export declare function newTask(proyecto: Proyect, textInput: string): void;
export declare function deleteTask(proyect: Proyect, index: number): void;
export declare function editTask(text: string, task: Task): void;
export declare function priorityTask(task: Task): void;
export declare function saveProyect(): void;
export declare function loadProyects(): void;
//# sourceMappingURL=05-Mode.d.ts.map