class Mesa {
    constructor(id, capacidad, ubicacion, estado = "disponible", x = 50, y = 50) {
        this.id = id;
        this.capacidad = capacidad;
        this.ubicacion = ubicacion;
        this.estado = estado;
        this.x = x;
        this.y = y;
    }

    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }
}

class Reserva {
    constructor(idReserva, nombreCliente, numeroPersonas, fechaReserva, horaReserva, idMesaAsignada, estadoReserva = "Confirmada", ocasionEspecial = "No", notasAdicionales = "No") {
        this.idReserva = idReserva;
        this.nombreCliente = nombreCliente;
        this.numeroPersonas = numeroPersonas;
        this.fechaReserva = fechaReserva;
        this.horaReserva = horaReserva;
        this.ocasionEspecial = ocasionEspecial;
        this.notasAdicionales = notasAdicionales;
        this.idMesaAsignada = idMesaAsignada;
        this.estadoReserva = estadoReserva;
    }
}

let Mesa1 = new Mesa(1, 4, 'patio', "disponible", 50, 50);
let Mesa2 = new Mesa(2, 6, 'centro', "disponible", 150, 150);
let Reserva1 = new Reserva(1, 'David Ordoñez', 5, "2025-09-20", "10:20", 3, "pendiente");
let listaMesas = [Mesa1, Mesa2];
let listaReservas = [Reserva1];

function cargarMesas() {
    const mesasGuardadas = localStorage.getItem('mesasRestaurante');
    if (mesasGuardadas) {
        const mesasData = JSON.parse(mesasGuardadas);
        listaMesas = mesasData.map(mesa => new Mesa(
            mesa.id, 
            mesa.capacidad, 
            mesa.ubicacion, 
            mesa.estado, 
            mesa.x, 
            mesa.y
        ));
    }
    renderizarMesas();
}

function cargarReservas(){
    const reservasGuardadas = localStorage.getItem('reservasRestaurante');
    if(reservasGuardadas){
        const reservasData = JSON.parse(reservasGuardadas);
        listaReservas = reservasData.map(reserva => new Reserva(
            reserva.idReserva,
            reserva.nombreCliente,
            reserva.numeroPersonas,
            reserva.fechaReserva,
            reserva.horaReserva,
            reserva.idMesaAsignada,
            reserva.estadoReserva,
            reserva.ocasionEspecial,
            reserva.notasAdicionales
        ));
    }
    renderizarReservas();
}

function guardarMesas() {
    localStorage.setItem('mesasRestaurante', JSON.stringify(listaMesas));
}

function guardarReservas(){
    localStorage.setItem('reservasRestaurante', JSON.stringify(listaReservas));
}

function renderizarMesas() {
    const docMesas = document.getElementById("tablesContainer");
    docMesas.innerHTML = '';
    
    listaMesas.forEach(mesa => {
        const tableDiv = document.createElement('div');
        tableDiv.className = `table ${mesa.estado}`;
        tableDiv.id = `mesa-${mesa.id}`;
        tableDiv.innerHTML = `
            <h2>Mesa ${mesa.id}</h2>
            <img class="tables-image" src="./tables-images/Mesa${mesa.capacidad}.jpeg"/>
            <div><strong>Ubicación:</strong> <p>${mesa.ubicacion}</p></div>
        `;
        
        tableDiv.style.left = `${mesa.x}px`;
        tableDiv.style.top = `${mesa.y}px`;
        
        docMesas.appendChild(tableDiv);
        
        hacerMesaArrastrable(tableDiv, mesa);
    });
}

function renderizarReservas(){
    const docReservas = document.getElementById("reservasContainer");
    docReservas.innerHTML = '';

    listaReservas.forEach(reserva =>{
        const reservaDiv = document.createElement('div');
        reservaDiv.className =`reserva ${reserva.estadoReserva}`;
        reservaDiv.id = `reserva-${reserva.id}`;
        reservaDiv.innerHTML=`
            <h2>Reserva ${reserva.idReserva}</h2>
            <p>Cliente: ${reserva.nombreCliente}</p>
            <p>Num. Personas: ${reserva.numeroPersonas}</p>
            <p>Fecha: ${reserva.fechaReserva}</p>
            <p>Hora: ${reserva.horaReserva}</p>
            <p>Mesa Asignada: ${reserva.idMesaAsignada}</p>
            <p>Ocasión Especial: ${reserva.ocasionEspecial}</p>
            <p>Notas: ${reserva.notasAdicionales}</p>
            <p>Estado: ${reserva.estadoReserva}</p>
        `;
    });
}

function hacerMesaArrastrable(element, mesa) {
    let offsetX, offsetY, isDragging = false;
    
    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        
        const rect = element.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        element.style.cursor = 'grabbing';
        element.style.zIndex = '10';
        
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const container = document.getElementById('tablesContainer');
        const containerRect = container.getBoundingClientRect();
        
        let x = e.clientX - containerRect.left - offsetX;
        let y = e.clientY - containerRect.top - offsetY;
        
        x = Math.max(0, Math.min(x, containerRect.width - element.offsetWidth));
        y = Math.max(0, Math.min(y, containerRect.height - element.offsetHeight));
        
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        
        mesa.x = x;
        mesa.y = y;
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            element.style.cursor = 'grab';
            element.style.zIndex = '1';
            guardarMesas(); 
        }
    });
}

console.log(listaMesas.length > 0 ? Math.max(...listaMesas.map(m => m.id)) + 1 : 1)

function agregarMesa(capacidad, ubicacion, estado) {
    const nuevaId = listaMesas.length > 0 ? Math.max(...listaMesas.map(m => m.id)) + 1 : 1;
    const nuevaMesa = new Mesa(
        nuevaId,
        capacidad,
        ubicacion,
        estado,
        50,
        50
    );
    
    listaMesas.push(nuevaMesa);
    renderizarMesas();
    guardarMesas();
}

function agregarReserva(nombreCliente, numeroPersonas, fechaReserva, horaReserva, idMesaAsignada, estadoReserva, ocasionEspecial, notasAdicionales){
    const nuevaId = listaReservas.length > 0 ? Math.max(...listaReservas.map(m => m.id)) + 1 : 1;
    const nuevaReserva = new Reserva(
        nuevaId,
        nombreCliente,
        numeroPersonas,
        fechaReserva,
        horaReserva,
        idMesaAsignada,
        estadoReserva,
        ocasionEspecial,
        notasAdicionales
    );

    listaReservas.push(nuevaReserva);
    renderizarReservas();
    guardarReservas();
};


document.addEventListener('DOMContentLoaded', () => {
    cargarMesas();
});

document.getElementById("formMesa").addEventListener("submit",()=>{
    let capacidadNuevaMesa = document.getElementById("cant").value;
    let ubicacionNuevaMesa = document.getElementById("inputUbi").value;
    let estadoNuevaMesa = document.getElementById("estado").value;
    agregarMesa(capacidadNuevaMesa, ubicacionNuevaMesa, estadoNuevaMesa);
    
})

document.getElementById("formReserva").addEventListener("submit", ()=>{
    let nombreCliente = document.getElementById("persona").value;
    let cantPersonas = document.getElementById("cantPersonas").value;
    let fechaReserva = document.getElementById("fechaReserva").value;
    let horaReserva = document.getElementById("horaReserva").value;
    let ocasionEspecial = document.getElementById("ocasionReserva").value;
    let notasAdicionales = document.getElementById("notasReserva").value
    let mesaReserva = document.getElementById("mesaReserva").value;
    let estadoReserva = document.getElementById("estadoReserva").value;
    agregarReserva(nombreCliente, cantPersonas, fechaReserva, horaReserva, mesaReserva, estadoReserva, ocasionEspecial, notasAdicionales);
})

//programar mínimo de fecha para el modal de reserva

const hoy = new Date().toISOString().split("T")[0];
console.log(hoy);
document.getElementById("fecha").setAttribute("min", hoy);


//verificación tiempos de atención input hora de reserva
const errorParag = document.getElementById('errorParagReserva');
const error = document.getElementById('error');

const inputHora = document.getElementById("hora");

inputHora.addEventListener("change", ()=>{
    if(inputHora.value < "08:00" || inputHora.value > "20:00"){
        errorParag.style.display = 'block';
        errorParag.innerText = "Error en la hora de la reserva, por favor ingrese una hora válida (entre las 08:00 am y 20:00 pm)";
        error.style.display = 'block';

    }else{
        errorParag.style.display = 'none';
        error.style.display='none';
    };
})

//verificación cantidad de personas reserva

const cantPersonas = document.getElementById("cantPersonas");

cantPersonas.addEventListener("change", ()=>{
    if(cantPersonas.value > 8 || cantPersonas.value < 1){
        errorParag.innerText = "Error en la cantidad de personas, por favor ingrese una cantidad válida (entre 1 y 8)";
        error.style.display = 'block';
    }else{
        error.style.display = 'none';
    };
})