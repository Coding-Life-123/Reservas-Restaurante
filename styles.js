function alternarModal(id, container){
    let estado = getComputedStyle(document.getElementById(id)).display;
    console.log(estado);
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

function alternarOpciones(id){
    const element = document.getElementById(id);
    const estado = getComputedStyle(element).display;
    console.log(element);

    document.querySelectorAll('.menu-opciones').forEach(menu => {
        if (menu.id !== id) {
            menu.style.display = 'none';
        }
    });

    if(estado == "flex"){
        element.style.display = 'none';
    }else if(estado == "none"){
        element.style.display = 'flex';
    };
}

document.addEventListener("click", (event) => {
    // Selecciona todos los menús abiertos
    const menus = document.querySelectorAll(".menu-opciones");
    console.log(menus);
    menus.forEach(menu => {
        const button = menu.previousElementSibling; // botón de tres puntos
        console.log(button);
        // Verifica si el click fue fuera del menú y del botón
        if (!menu.contains(event.target) && !button.contains(event.target)) {
            menu.style.display = "none";
        }
    });
});

document.addEventListener("click", (event) => {
    const menuNav = document.querySelector(".nav-menu");
    console.log(menuNav);
    
    const button = menuNav.previousElementSibling; 
    console.log(button);
    if (!menuNav.contains(event.target) && !button.contains(event.target)) {
        hamburger.classList.remove("active");
        menu.classList.remove("open");
    }
});

window.onload = function() {
  document.getElementById('adminReservas').style.display = "flex";
};



