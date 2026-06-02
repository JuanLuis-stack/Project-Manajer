// <================== 05-menuView.ts =================>

import { layoutElements } from "../../5-TrayElements/5-trayElements.js"

const {
    logo,
    menu,
    menuContainer
} = layoutElements

let menuViewFulsy:boolean = false;
export function menuView(){
    if(!logo || !menu || menuContainer === null)return;

    if(!menuViewFulsy){
        logo.className = "bx bx-x";
        menu.style.left = "0";
        menuContainer.style.display = "inline";
        menuViewFulsy = true;

        const menuActive = document.querySelector<HTMLElement>(".optionsBtn__menu");
        if(menuActive){
            menuActive.remove();
            console.log("menu removed");
        }
        document.body.style.overflowY = "hidden"
        const existingLi = document.querySelector<HTMLLIElement>(".li__workingOn");
        if(existingLi){
            existingLi.classList.remove("li__workingOn");
        }
    }else{
        document.body.style.overflowY = "scroll"
        logo.className = "bx bx-menu";
        menu.style.left = "-200%";
        menuContainer.style.display = "none";        
        menuViewFulsy = false;
    }
}
