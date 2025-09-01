function alternarModal(id){
    let estado = getComputedStyle(document.getElementById(id)).display;
    console.log(estado);
    if(estado == "flex"){
        document.getElementById(id).style.display = "none";
        document.getElementById("modalContainer").style.display = "none";
    }else if(estado == "none"){
        document.getElementById(id).style.display = "flex";
        document.getElementById("modalContainer").style.display = "flex";
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
    }
}

document.getElementById('adminReservas').style.display="none";
