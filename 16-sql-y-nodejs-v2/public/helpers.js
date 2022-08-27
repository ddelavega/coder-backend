const socket = io.connect({ transports: ['websocket'], upgrade: false });
// var socket = io({transports: ['websocket'], upgrade: false});

async function enviarMensaje() {
  // const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');
  // const date = new Date();
  // const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  // const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
  // const fecha = `${day}/${month}/${year} ${hour >= 0 && hour < 10 ? '0' + hour : hour}:${minutes >= 0 && minutes < 10 ? '0' + minutes : minutes}:${seconds >= 0 && seconds < 10 ? '0' + seconds : seconds}`;

  if (!email.value || !mensaje.value) {
    alert('Debe completar los campos');
    return false;
  }

  socket.emit('updateMsg', {
    autor: email.value,
    texto: mensaje.value
  });
  mensaje.value = '';
  return false;
}



function borrarMensajes() {
  const autor = document.getElementById('email').value;
  // delete messages
  socket.emit('deleteMessages', autor);
}

const btnBorrarMensajes = document.getElementById('deleteMsg');
btnBorrarMensajes.addEventListener('click', borrarMensajes);

socket.on('messages', async (messages) => {
  console.log('mensajesSSS', messages);

  let mensajesHtml = messages
    .map((mensaje) => `<span><b>${mensaje.autor} [<span class="time">${mensaje.date}</span>]: </b>${mensaje.texto}</span>`)
    .join('<br>');
  document.getElementById('messagesList').innerHTML = mensajesHtml;
  // }
});