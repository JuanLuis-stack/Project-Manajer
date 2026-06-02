// <================ 05-trayHelper ================>

export function priorityElement(element: HTMLElement){
    element.style.backgroundColor = "#29f2";
    element.style.border = "2px solid #29f";
    element.style.boxShadow = "0 0 10px #29f";
}


export function closeMenu (menu: HTMLElement | null, event: PointerEvent,classElement: string, closer: () => void){
        if(!menu)return;

        const target = event.target;

        if(!(target instanceof HTMLElement))return;

        if(menu.contains(target))return;

        if(target.closest(classElement))return;
        
        closer();
}
