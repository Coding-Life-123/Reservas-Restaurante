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

let listaMesas = [];
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
            <div class="top-menu-mesa">
                <h2>Mesa ${mesa.id}</h2>
                <div class="mesa-menu">
                    <button class="no-draggable" onclick="alternarOpciones('opcionesMesa${mesa.id}', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                    <div class="opciones-mesa menu-opciones" id="opcionesMesa${mesa.id}">
                        <button onclick="modalEditarMesa(${mesa.id})">Editar Mesa</button>
                        <button onclick="crearReservaDeMesa(${mesa.id})">Reservar</button>
                        <button onclick="deshabilitarMesa(${mesa.id}, 'ocupada')">Estado: Ocupada</button>
                        <button onclick="deshabilitarMesa(${mesa.id}, 'deshabilitada')">Estado: Deshabilitada</button>
                        <button onclick="eliminarMesa(${mesa.id})">Eliminar</button>
                    </div>
                </div>
            </div>
            <img class="tables-image" src="./tables-images/Mesa${mesa.capacidad}.jpeg"/>
            <div><strong>Ubicación:</strong> <p>${mesa.ubicacion}</p></div>
        `;
        
        tableDiv.style.left = `${mesa.x}px`;
        tableDiv.style.top = `${mesa.y}px`;
        
        docMesas.appendChild(tableDiv);
        
        hacerMesaArrastrable(tableDiv, mesa);
    });
}

function renderizarReservas(renderReservas = listaReservas){
    const docReservas = document.getElementById("reservasContainer");
    docReservas.innerHTML = '';

    renderReservas.forEach(reserva =>{
        const reservaDiv = document.createElement('div');
        reservaDiv.className =`reserva ${reserva.estadoReserva}`;
        reservaDiv.id = `reserva-${reserva.idReserva}`;
        reservaDiv.innerHTML=`
            <div class="reserva-head">
                <h2>Reserva ${reserva.idReserva}</h2>
                <div class="reserva-menu">
                    <button onclick="alternarOpciones('opcionesReserva${reserva.idReserva}', this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                        </svg>
                    </button>
                    <div class="opciones-reserva menu-opciones" id="opcionesReserva${reserva.idReserva}">
                        <button onclick="modalEditarReserva(${reserva.idReserva})">Editar</button>
                        <button onclick="finalizarReserva(${reserva.idReserva})">Pagar Cuenta</button>
                        <button onclick="eliminarReserva(${reserva.idReserva})">Eliminar</button>
                    </div>
                </div>
            </div>            
            <div class="reserva-info">
                <div>
                    <p><Strong>Cliente:</Strong> ${reserva.nombreCliente}</p>
                    <p><Strong>Num. Personas:</Strong> ${reserva.numeroPersonas}</p>
                </div>
                <div>
                    <p><Strong>Fecha:</Strong> ${reserva.fechaReserva}</p>
                    <p><Strong>Hora:</Strong> ${reserva.horaReserva}</p>
                </div>
                <div>
                    <p><Strong>Mesa Asignada:</Strong> ${reserva.idMesaAsignada}</p>
                    <p><Strong>Ocasión Especial:</Strong> ${reserva.ocasionEspecial}</p>
                </div>
                <div>
                    <p><Strong>Notas:</Strong> ${reserva.notasAdicionales}</p>
                    <p><Strong>Estado:</Strong> ${reserva.estadoReserva}</p>
                </div>
            </div>
        `;
        docReservas.appendChild(reservaDiv);
    });
}

function hacerMesaArrastrable(element, mesa) {
    let offsetX, offsetY, isDragging = false;
        

    element.addEventListener('mousedown', (e) => {

        let listaActivos = [];

        document.querySelectorAll(".opciones-mesa").forEach(item => {
            listaActivos.push(item.classList.contains("activo"));
        });

        let esActivo = listaActivos.includes(true)

        console.log(listaActivos.includes(true));
        

        if(e.target.closest('.no-draggable')){
            return;
        };
        
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
    const nuevaId = listaReservas.length > 0 ? Math.max(...listaReservas.map(r => r.idReserva)) + 1 : 1;
    const nuevaReserva = new Reserva(
        nuevaId,
        nombreCliente,
        numeroPersonas,
        fechaReserva,
        horaReserva,
        idMesaAsignada,
        estadoReserva ? estadoReserva: "No",
        ocasionEspecial ? ocasionEspecial: "No",
        notasAdicionales ? notasAdicionales: "No"
    );

    listaReservas.push(nuevaReserva);
    renderizarReservas();
    guardarReservas();
};


document.addEventListener('DOMContentLoaded', () => {
    cargarMesas();
    cargarReservas();
});

document.getElementById("formMesa").addEventListener("submit",()=>{
    let capacidadNuevaMesa = document.getElementById("cant").value;
    let ubicacionNuevaMesa = document.getElementById("inputUbi").value;
    let estadoNuevaMesa = document.getElementById("estado").value;
    agregarMesa(capacidadNuevaMesa, ubicacionNuevaMesa, estadoNuevaMesa);
    alternarModal('modalMesa', 'mesaContainer');
})

document.getElementById("formReserva").addEventListener("submit", ()=>{
    let nombreCliente = document.getElementById("persona").value;
    let cantPersonas = parseInt(document.getElementById("cantPersonas").value);
    let fechaReserva = document.getElementById("fechaReserva").value;
    let horaReserva = document.getElementById("horaReserva").value;
    let ocasionEspecial = document.getElementById("ocasionReserva").value;
    let notasAdicionales = document.getElementById("notasReserva").value
    let mesaReserva = parseInt(document.getElementById("mesaReserva").value);
    let estadoReserva = document.getElementById("estadoReserva").value;
    agregarReserva(nombreCliente, cantPersonas, fechaReserva, horaReserva, mesaReserva, estadoReserva, ocasionEspecial, notasAdicionales);
    alternarModal('modalReserva', 'reservaContainer');
})

//programar mínimo de fecha para el modal de reserva

const hoy = new Date().toISOString().split("T")[0];
document.getElementById("fechaReserva").setAttribute("min", hoy);

//verificación tiempos de atención input hora de reserva
const errorParag = document.getElementById('errorParagReserva');
const error = document.getElementById('error');

const inputHora = document.getElementById("horaReserva");

inputHora.addEventListener("change", ()=>{
    if(inputHora.value < "08:00" || inputHora.value > "20:00"){
        errorParag.style.display = 'block';
        errorParag.innerText = "Error en la hora de la reserva, por favor ingrese una hora válida (entre las 08:00 am y 20:00 pm)";
        error.style.display = 'block';
        botonEnviarEditReserva.setAttribute("disabled", "disabled");
    }else{
        errorParag.style.display = 'none';
        error.style.display='none';
    };
})

//verificación cantidad de personas reserva

const cantPersonas = document.getElementById("cantPersonas");
const botonEnviarReserva = document.getElementById("submitBtnReserva")

cantPersonas.addEventListener("change", ()=>{
    if(cantPersonas.value > 8 || cantPersonas.value < 1){
        errorParag.innerText = "Error en la cantidad de personas, por favor ingrese una cantidad válida (entre 1 y 8)";
        error.style.display = 'block';
        botonEnviarReserva.setAttribute("disabled", "disabled");
    }else{
        error.style.display = 'none';
        botonEnviarReserva.removeAttribute("disabled")
    };
})

function crearReservaDeMesa(id){
    console.log("reservar");
}

function modalEditarMesa(id){
    console.log("editar mesa");
}

function actualizarMesa(index, JSON){
    console.log("actualizar mesa");
}

function eliminarMesa(id){
    console.log("eliminar mesa");
}

function cambiarEstadoMesa(id, estado){
    console.log(`cambiar estado de mesa ${id}, ${estado}`);
}

function modalEditarReserva(id){
    alternarModal("editReservaModal","editReservaContainer");
    let reserva = listaReservas.find(reserva => reserva.idReserva === id);
    let idReserva = listaReservas.findIndex(reserva => reserva.idReserva === id);
    let element = document.getElementById("editReservaModal");
    element.innerHTML = `
        <button onclick="alternarModal('editReservaModal', 'editReservaContainer')">X</button>
        <h1>Editar Reserva ${reserva.idReserva}</h1>

        <form id="formEditReserva">
          <div class="form-group">
            <label for="editPersona">Nombre del Cliente:</label>
            <input type="text" name="persona" id="editPersona" value="${reserva.nombreCliente}">
          </div>
          <div class="form-group">
            <label for="editCantPersonas">Cantidad de Personas:</label>
            <input type="number" name="editCantPersonas" id="editCantPersonas" max="8" min="1" value="${reserva.numeroPersonas}">
          </div>
          <div class="form-group">
            <label for="editFechaReserva">Fecha de la Reserva:</label>
            <input type="date" name="editFechaReserva" id="editFechaReserva" min="${hoy}" value="${reserva.fechaReserva}">
          </div>
          <div class="form-group">
            <label for="editHoraReserva">Hora de la Reserva:</label>
            <input type="time" name="editHoraReserva" id="editHoraReserva" min="08:00" max="20:00" required value="${reserva.horaReserva}">
          </div>
          <div class="form-group">
            <label for="editOcasionReserva">Ocasión Especial:</label>
            <input type="text" name="editOcasionReserva" id="editOcasionReserva" value="${reserva.ocasionEspecial}">
          </div>
          <div class="form-group">
            <label for="editNotasReserva">Notas adicionales:</label>
            <input type="text" name="editNotasReserva" id="editNotasReserva" value="${reserva.notasAdicionales}">
          </div>
          <div class="form-group">
            <label for="editMesaReserva">Número de Mesa Asignada:</label>
            <input type="number" name="editMesaReserva" id="editMesaReserva" value="${reserva.idMesaAsignada}">
          </div>
          <div class="form-group">
            <label for="editEstadoReserva">Estado de la Reserva:</label>
            <select name="editEstadoReserva" id="editEstadoReserva">
              <option id="reservapendiente" value="pendiente">Pendiente</option>
              <option id="reservaconfirmada" value="confirmada">Confirmada</option>
              <option id="reservacancelada" value="cancelada">Cancelada</option>
              <option id="reservafinalizada" value="finalizada">Finalizada</option>
              <option id="reservano show" value="no show">No show</option>
            </select>
          </div>
          <div class="error" id="editErrorReserva">
            <strong>Error:</strong>
            <p class="error-parag" id="errorParagEditReserva">

            </p>
          </div>
          <button onclick="" class="submit-btn" id="submitBtnEditReserva">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" class="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </button>
        </form>
    `

    document.getElementById("formEditReserva").addEventListener("submit", ()=>{

        let editJSON = {
            editNombCliente : document.getElementById("editPersona").value,
            editCantPersonas : document.getElementById("editCantPersonas").value,
            editFecha : document.getElementById("editFechaReserva").value,
            editHora : document.getElementById("editHoraReserva").value,
            editOcasion : document.getElementById("editOcasionReserva").value,
            editNotas : document.getElementById("editNotasReserva").value,
            editIdMesa : document.getElementById("editMesaReserva").value,
            editEstado : document.getElementById("editEstadoReserva").value
        }

        actualizarReserva(idReserva, editJSON);

        console.log(editJSON.editEstado)
        reserva.nombreCliente = editJSON.editNombCliente;
        reserva.numeroPersonas = editJSON.editCantPersonas;
        reserva.fechaReserva = editJSON.editFecha;
        reserva.horaReserva = editJSON.editHora;
        reserva.ocasionEspecial = editJSON.editOcasion;
        reserva.notasAdicionales = editJSON.editNotas;
        reserva.idMesaAsignada = editJSON.editIdMesa;
        reserva.estadoReserva = editJSON.editEstado;
    })
    
    const errorEditParag = document.getElementById('errorParagEditReserva');
    const editErrorRes = document.getElementById('editErrorReserva');
    const botonEnviarEditReserva = document.getElementById("submitBtnEditReserva");
    const inputEditHora = document.getElementById("editHoraReserva");

    console.log(inputEditHora.value)
    inputEditHora.addEventListener("change", ()=>{
        if(inputEditHora.value < "08:00" || inputEditHora.value > "20:00"){
            errorEditParag.style.display = 'block';
            errorEditParag.textContent = "Error en la hora de la reserva, por favor ingrese una hora válida (entre las 08:00 am y 20:00 pm)";
            editErrorRes.style.display = 'block';
            botonEnviarEditReserva.setAttribute("disabled", "disabled");
        }else{
            errorEditParag.style.display = 'none';
            editErrorRes.style.display='none';
            botonEnviarEditReserva.removeAttribute("disabled");
        };
    })

    const cantEditPersonas = document.getElementById("editCantPersonas");

    cantEditPersonas.addEventListener("change", ()=>{
        if(cantEditPersonas.value > 8 || cantEditPersonas.value < 1){
            errorEditParag.innerText = "Error en la cantidad de personas, por favor ingrese una cantidad válida (entre 1 y 8)";
            editErrorRes.style.display = 'block';
            botonEnviarEditReserva.setAttribute("disabled", "disabled");
        }else{
            editErrorRes.style.display = 'none';
            botonEnviarEditReserva.removeAttribute("disabled");
        };
    })
}

function actualizarReserva(index, JSON){
    const reservaActual = listaReservas[index];
    reservaActual.nombreCliente = JSON.editNombCliente;
    reservaActual.numeroPersonas = JSON.editCantPersonas;
    reservaActual.fechaReserva = JSON.editFecha;
    reservaActual.horaReserva = JSON.editHora;
    reservaActual.ocasionEspecial = JSON.editOcasion;
    reservaActual.notasAdicionales = JSON.editNotas;
    reservaActual.idMesaAsignada = JSON.editIdMesa;
    reservaActual.estadoReserva = JSON.editEstado;
    
    guardarReservas();
    renderizarReservas();
    console.log("subido exitosamente");
}

function finalizarReserva(id) {
    let index = listaReservas.findIndex(reserva => reserva.idReserva === id);

    if (index !== -1) {
        listaReservas[index].estadoReserva = "finalizada";
        console.log("final reserva", listaReservas[index]);
    } else {
        console.error("Reserva no encontrada con id:", id);
    }
    renderizarReservas();
}


function eliminarReserva(id){
    let index = listaReservas.findIndex(reserva => reserva.idReserva === id);

    if (index !== -1) {
        listaReservas.splice(index, 1)
        console.log("final reserva", listaReservas[index]);
    } else {
        console.error("Reserva no encontrada con id:", id);
    }
    renderizarReservas();
}
console.log(hoy);

listaReservas = JSON.parse(localStorage.getItem("reservasRestaurante"));
console.log(listaMesas);
console.log(listaReservas);


