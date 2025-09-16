function alternarModal(id, container){
    let estado = getComputedStyle(document.getElementById(id)).display;
    if(estado == "flex"){
        document.getElementById(id).style.display = "none";
        document.getElementById(container).style.display = "none";
    }else if(estado == "none"){
        document.getElementById(id).style.display = "flex";
        document.getElementById(container).style.display = "flex";
    };
};

const hamburger = document.getElementById("burger");
const menu = document.getElementById("navbar");

document.getElementById('menuButton').addEventListener("click", ()=>{
    hamburger.classList.toggle("active");
    menu.classList.toggle("open");
})

function alternarPagina(pag){
    if(pag == 'adminMesas'){
        document.getElementById('adminReservas').style.display="none";
        document.getElementById(pag).style.display="flex";
    }else if(pag == 'adminReservas'){
        document.getElementById('adminMesas').style.display="none";
        document.getElementById(pag).style.display="flex";
    };
}

function alternarOpciones(id, button){
    const element = document.getElementById(id);
    const estado = getComputedStyle(element).display;
    const rect = button.getBoundingClientRect();
    
    document.querySelectorAll('.menu-opciones').forEach(menu => {
        if (menu.id !== id) {
            menu.style.display = 'none';
            menu.classList.remove('activo');
        }
    });
    
    if(estado == "flex"){
        element.style.opacity = 0;
        element.classList.remove('activo');
        setTimeout(() => {
            element.style.display = 'none';            
        }, 600);
    }else if(estado == "none"){
        element.style.display = 'flex';
        setTimeout(() => {
            element.style.top = rect.bottom + "px"; 
            element.style.left = (rect.right - element.offsetWidth) + "px";
            element.style.opacity = 1;
            element.classList.add('activo');
        }, 1);
    };
}

document.addEventListener("mousedown", (event) => {
    const menus = document.querySelectorAll(".menu-opciones");

    menus.forEach(menu => {
        const button = menu.previousElementSibling; 
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.style.opacity = 0;
            menu.classList.remove("activo")
            setTimeout(() => {
                menu.style.display = 'none';            
            }, 600);
        }
    });
});

document.addEventListener("mousedown", (event) => {
    const menuNav = document.querySelector(".nav-menu");
    const button = menuNav.previousElementSibling; 

    if (!menuNav.contains(event.target) && !button.contains(event.target)) {
        hamburger.classList.remove("active");
        menu.classList.remove("open");
    }
});

window.onload = function() {
  document.getElementById('adminMesas').style.display = "flex";
};



