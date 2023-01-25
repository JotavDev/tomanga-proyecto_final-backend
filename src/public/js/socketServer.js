const socket = io();

socket.emit('message', 'hola, soy el cliente')

socket.on('mensaje_para_todos', data => {
    console.log(data)
})