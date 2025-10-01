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
            </div>
            <img class="tables-image" src="./tables-images/Mesa${mesa.capacidad}.jpeg"/>
            <div><strong>Ubicación:</strong> <p>${mesa.ubicacion}</p></div>
            <div class="opciones-mesa">
                <button class="no-draggable" onclick="modalEditarMesa(${mesa.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>
                <button class="no-draggable" onclick="crearReservaDeMesa(${mesa.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                </button>
                <button class="no-draggable" onclick="eliminarMesa(${mesa.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>                
                </button>
            </div>
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
        if (e.target.closest('.no-draggable')) {
            e.stopPropagation();
            return;
        }

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

const errorParagReserva = document.getElementById('errorParagReserva');
const error = document.getElementById('error');
const botonEnviarReserva = document.getElementById("submitBtnReserva")

//verificación nombre de cliente obligatorio
const nombCliente = document.getElementById("persona");

nombCliente.addEventListener("change", ()=>{
    if(nombCliente.value.trim() == "" || nombCliente.value == null){
        errorParagReserva.style.display = 'block';
        errorParagReserva.innerText = "Error en el nombre del cliente, por favor ingrese un nombre válido";
        error.style.display = 'block';
        botonEnviarReserva.setAttribute("disabled", "disabled");
    }else{
        errorParagReserva.style.display = 'none';
        error.style.display='none';
    };
})

//programar mínimo de fecha para el modal de reserva
/*const hoy = new Date().toISOString().split("T")[0];
document.getElementById("fechaReserva").setAttribute("min", hoy);

//verificación tiempos de atención input hora de reserva
const inputHora = document.getElementById("horaReserva");

inputHora.addEventListener("change", ()=>{
    if(inputHora.value < "08:00" || inputHora.value > "20:00"){
        errorParagReserva.style.display = 'block';
        errorParagReserva.innerText = "Error en la hora de la reserva, por favor ingrese una hora válida (entre las 08:00 am y 20:00 pm)";
        error.style.display = 'block';
        botonEnviarReserva.setAttribute("disabled", "disabled");
    }else{
        errorParagReserva.style.display = 'none';
        error.style.display='none';
    };
})*/

//verificación cantidad de personas reserva

const cantPersonas = document.getElementById("cantPersonas");

cantPersonas.addEventListener("change", ()=>{
    if(cantPersonas.value > 8 || cantPersonas.value < 1){
        errorParagReserva.innerText = "Error en la cantidad de personas, por favor ingrese una cantidad válida (entre 1 y 8)";
        error.style.display = 'block';
        botonEnviarReserva.setAttribute("disabled", "disabled");
    }else{
        error.style.display = 'none';
        botonEnviarReserva.removeAttribute("disabled")
    };
})

function crearReservaDeMesa(id){
    console.log("reservar", id);
    alternarModal('modalReserva', 'reservaContainer');
}

function modalEditarMesa(id){
    alternarModal("editMesaModal", "editMesaContainer");
    let mesa = listaMesas.find(mesa => mesa.id === id);
    let idMesa = listaMesas.findIndex(mesa => mesa.id === id);
    let element = document.getElementById("editMesaModal");
    console.log(mesa)
    element.innerHTML = `
        <button onclick="alternarModal('editMesaModal', 'editMesaContainer')">X</button>
        <h1>Editar Mesa ${mesa.id}</h1>

        <form id="formEditMesa">
            <div class="form-group">
                <label for="editCapacidad">Capacidad: </label>
                <input type="number" name="capacidad" id="editCapacidad" value="${mesa.capacidad}">
            </div>
            <div class="form-group">
                <label for="editUbicacion">Ubicación: </label>
                <input type="text" name="ubicacion" id="editUbicacion" value="${mesa.ubicacion}">
            </div>
            <div class="form-group">
                <label for="editEstado">Estado: </label>
                <select name="editEstado" id="editEstado">
                  <option value="disponible">Disponible</option>
                  <option value="ocupada">Ocupada</option>
                  <option value="deshabilitada">Deshabilitada</option>
                </select>
            </div>
            <div class="error" id="editErrorMesa">
                <strong>Error:</strong>
                <p class="error-parag" id="errorParagEditMesa">

                </p>
            </div>
            <button type="submit" class="submit-btn" id="submitBtnEditMesa">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" class="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
            </button>
        </form>
    `

    document.getElementById("formEditMesa").addEventListener("submit", ()=>{
        let editJSON = {
            capacidad : document.getElementById("editCapacidad").value,
            ubicacion : document.getElementById("editUbicacion").value,
            estado : document.getElementById("editEstado").value
        }
        console.log(editJSON);

        actualizarMesa(idMesa, editJSON)
    })
}

function actualizarMesa(index, JSON){
    const mesaActual = listaMesas[index];
    mesaActual.capacidad = JSON.capacidad;
    mesaActual.ubicacion = JSON.ubicacion;
    mesaActual.estado = JSON.estado;
    
    guardarMesas();
    renderizarMesas();
    console.log("Mesa subida exitosamente");

}

function eliminarMesa(id){
    const index = listaMesas.findIndex(mesa => mesa.id === id);
    if (index !== -1) {
            console.log("Mesa eliminada", listaMesas[index]);
            listaMesas.splice(index, 1)
        } else {
            console.error("Reserva no encontrada con id:", id);
        }
        guardarMesas();
        renderizarMesas();
}

function modalEditarReserva(id){
    let hoy = new Date().toISOString().split("T")[0];
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
            <select name="editNumMesaReserva" id="editNumMesaAsignada">
            
            </select>
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
          <button type="submit" class="submit-btn" id="submitBtnEditReserva">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1" class="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </button>
        </form>
    `

        document.getElementById("editFechaReserva").addEventListener("change", mostrarMesasDisponiblesEditarReserva);
        document.getElementById("editHoraReserva").addEventListener("change", mostrarMesasDisponiblesEditarReserva);

        function mostrarMesasDisponiblesEdicion() {
        const select = document.getElementById("editNumMesaAsignada");
        select.innerHTML = '';

        const fecha = document.getElementById("editFechaReserva").value;
        const hora = document.getElementById("editHoraReserva").value;

        if (!fecha || !hora) {
            select.innerHTML = `<option disabled>Seleccione fecha y hora</option>`;
            return;
        }

        let mesasDisponibles = listaMesas.filter(mesa =>
            mesa.estado == "disponible" && (
                mesa.id == reserva.idMesaAsignada || estaMesaDisponible(mesa.id, fecha, hora)
            )
        );

        if (mesasDisponibles.length === 0) {
            select.innerHTML = `<option disabled>No hay mesas disponibles</option>`;
        } else {
            mesasDisponibles.forEach(mesa => {
                select.innerHTML += `<option value="${mesa.id}" ${mesa.id == reserva.idMesaAsignada ? "selected" : ""}>Mesa ${mesa.id}</option>`;
            });
        }
    }

    mostrarMesasDisponiblesEdicion();

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
    guardarReservas();
    renderizarReservas();
}

function avisoEliminarReserva(id){

}

function eliminarReserva(id){
    
    let index = listaReservas.findIndex(reserva => reserva.idReserva === id);

    if (index !== -1) {
        listaReservas.splice(index, 1)
        console.log("final reserva", listaReservas[index]);
    } else {
        console.error("Reserva no encontrada con id:", id);
    }
    guardarReservas();
    renderizarReservas();
}

listaReservas = JSON.parse(localStorage.getItem("reservasRestaurante"));

function estaMesaDisponible(idMesa, fecha, horaInicio) {
    const inicioNueva = new Date(`${fecha}T${horaInicio}`);
    const finNueva = new Date(inicioNueva.getTime() + 4 * 60 * 60 * 1000); 

    const reservasMesa = listaReservas.filter(r => r.idMesaAsignada == idMesa && r.fechaReserva === fecha);

    for (let reserva of reservasMesa) {
        const inicioExistente = new Date(`${reserva.fechaReserva}T${reserva.horaReserva}`);
        const finExistente = new Date(inicioExistente.getTime() + 4 * 60 * 60 * 1000);

        if (inicioNueva < finExistente && finNueva > inicioExistente) {
            return false; 
        }
    }

    return true; 
}


function mostrarMesasDisponiblesReserva() {
    const select = document.getElementById("numMesaAsignada");
    select.innerHTML = '';

    const fechaReserva = document.getElementById("fechaReserva").value;
    const horaReserva = document.getElementById("horaReserva").value;

    if (!fechaReserva || !horaReserva) {
        select.innerHTML = `<option disabled>Seleccione fecha y hora primero</option>`;
        return;
    }

    let mesasDisponibles = listaMesas.filter(mesa => 
        mesa.estado == "disponible" && estaMesaDisponible(mesa.id, fechaReserva, horaReserva)
    );
    
    if (mesasDisponibles.length === 0) {
        select.innerHTML = `<option disabled>No hay mesas disponibles</option>`;
    } else {
        mesasDisponibles.forEach(mesa => {
            select.innerHTML += `
                <option value="${mesa.id}">Mesa ${mesa.id}</option>
            `;
        });
    }
}

function mostrarMesasDisponiblesEditarReserva() {
    const select = document.getElementById("editNumMesaAsignada");
    select.innerHTML = '';

    const fechaReserva = document.getElementById("editFechaReserva").value;
    const horaReserva = document.getElementById("editHoraReserva").value;

    if (!fechaReserva || !horaReserva) {
        select.innerHTML = `<option disabled>Seleccione fecha y hora primero</option>`;
        return;
    }

    let mesasDisponibles = listaMesas.filter(mesa => 
        mesa.estado == "disponible" && estaMesaDisponible(mesa.id, fechaReserva, horaReserva)
    );
    
    if (mesasDisponibles.length === 0) {
        select.innerHTML = `<option disabled>No hay mesas disponibles</option>`;
    } else {
        mesasDisponibles.forEach(mesa => {
            select.innerHTML += `
                <option value="${mesa.id}">Mesa ${mesa.id}</option>
            `;
        });
    }
}

document.getElementById("fechaReserva").addEventListener("change", mostrarMesasDisponiblesReserva);
document.getElementById("horaReserva").addEventListener("change", mostrarMesasDisponiblesReserva);

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
    let mesaReserva = document.getElementById("numMesaAsignada").value;
    let estadoReserva = document.getElementById("estadoReserva").value;
    agregarReserva(nombreCliente, cantPersonas, fechaReserva, horaReserva, mesaReserva, estadoReserva, ocasionEspecial, notasAdicionales);
    alternarModal('modalReserva', 'reservaContainer');
})


let dia = 0

let reservasDeHoy = [];

function verificarDia(){
    const fecha = new Date();

    const rawDia = fecha.toLocaleDateString("es-CO").split("/").reverse()
    console.log(rawDia)

    if(rawDia[1].length == 1){
        let saveNum = "0" + rawDia[1];
        rawDia.splice(1, 1, saveNum);
        dia = rawDia.join("-");
    }else{
        dia = rawDia.join("-");
    }

    reservasDeHoy = listaReservas.filter(reserva => reserva.fechaReserva === dia)
    console.log(listaReservas[0].fechaReserva);
    console.log(dia)
    console.log(reservasDeHoy)
}

verificarDia()

const intervaloDiario = 1 * 24 * 60 * 60 * 1000

setInterval(() => {
    verificarDia()
}, intervaloDiario);



verificarDia()
setInterval(() => {
    const fecha = new Date();
    let hora = fecha.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    let reservasDeAhora;
    console.log(hora)
    reservasDeAhora = reservasDeHoy.filter(reserva => reserva.horaReserva === hora)
    console.log(reservasDeAhora);
    reservasDeAhora.forEach(reserva => {
      console.log(reserva.idMesaAsignada)
      document.getElementById('mesa-'+reserva.idMesaAsignada).classList.add("ocupada");
      document.getElementById('mesa-'+reserva.idMesaAsignada).classList.remove("disponible");
      document.getElementById('mesa-'+reserva.idMesaAsignada).classList.remove("deshabilitada");
    })
}, 7000);

