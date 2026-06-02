// <================ 05-trayHelper ================>
export function priorityElement(element) {
    element.style.backgroundColor = "#29f2";
    element.style.border = "2px solid #29f";
    element.style.boxShadow = "0 0 10px #29f";
}
export function closeMenu(menu, event, classElement, closer) {
    if (!menu)
        return;
    const target = event.target;
    if (!(target instanceof HTMLElement))
        return;
    if (menu.contains(target))
        return;
    if (target.closest(classElement))
        return;
    closer();
}
//# sourceMappingURL=05-trayHelper.js.map