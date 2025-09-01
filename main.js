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

let Mesa1 = new Mesa(1, 4, 'patio', "disponible", 50, 50);
let Mesa2 = new Mesa(2, 6, 'centro', "disponible", 150, 150);
let Reserva1 = new Reserva(1, 'David Ordoñez', 5)
let listaMesas = [Mesa1, Mesa2];
let listaReservas = [];

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

function guardarMesas() {
    localStorage.setItem('mesasRestaurante', JSON.stringify(listaMesas));
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
    const nuevaIdReserva = listaReservas.length > 0 ? Math.max(...listaReservas.map(m => m.id)) + 1 : 1;
    const nuevaReserva = new Reserva(
        nuevaIdReserva,
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
};

document.addEventListener('DOMContentLoaded', () => {
    cargarMesas();
});

document.getElementById("formTable").addEventListener("submit",()=>{
    let capacidadNuevaMesa = document.getElementById("cant").value;
    let ubicacionNuevaMesa = document.getElementById("inputUbi").value;
    let estadoNuevaMesa = document.getElementById("estado").value;
    agregarMesa(capacidadNuevaMesa, ubicacionNuevaMesa, estadoNuevaMesa);
    
})

