// 5-trayElements.ts

export const proyectElements = Object.freeze({
    proyectAlmacen: document.querySelector<HTMLUListElement>("#proyectAlmacen"),
    createTaskBtn: document.querySelector<HTMLButtonElement>("#createBtn"),
    titleContainer: document.querySelector<HTMLDivElement>("#proyectTitle"),
    objContainer: document.querySelector<HTMLDivElement>("#objContainer"),
    empty: document.querySelector<HTMLElement>("#empty"),
});

export const tasksElements = Object.freeze({
    taskAlmacen: document.querySelector<HTMLUListElement>("#tasksAlmacen"),
});

export const layoutElements = Object.freeze({
    logo: document.querySelector<HTMLDivElement>("#logo"),
    menu: document.querySelector<HTMLElement>("#menu"),
    menuContainer: document.querySelector<HTMLDivElement>("#menuContainer"),
});