const socket = io.connect();

async function enviarMensaje() {
  // const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const date = new Date();
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  const fecha = `${day}/${month}/${year} ${hour >= 0 && hour < 10 ? '0' + hour : hour}:${minutes >= 0 && minutes < 10 ? '0' + minutes : minutes}:${seconds >= 0 && seconds < 10 ? '0' + seconds : seconds}`;

  if (!email.value || !mensaje.value) {
    alert("Debe completar los campos");
    return false;
  }

  socket.emit("mensajeNuevo", {
    autor: email.value,
    texto: mensaje.value,
    fecha: fecha
  });
  mensaje.value = "";
  return false;
}


function borrarMensajes() {
  const autor = document.getElementById("email").value;
  // delete messages
  socket.emit("borrarMensajes", autor);
}

const btnBorrarMensajes = document.getElementById("eliminarMensaje");
btnBorrarMensajes.addEventListener("click", borrarMensajes);

socket.on("mensajes", (mensajes) => {
  if (mensajes) {

    console.log('mensajesSSS', mensajes);

    let mensajesHtml = mensajes
      .map((mensaje) => `<span><b>${mensaje.autor} [<span class="time">${mensaje.fecha}</span>]: </b>${mensaje.texto}</span>`)
      .join("<br>");
    document.getElementById("listaMensajes").innerHTML = mensajesHtml;
  }

});

