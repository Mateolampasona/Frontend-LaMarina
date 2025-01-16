import {io} from 'socket.io-client';

const socket = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`)

socket.on('connect', () => {
    console.log("Conectando al servidor de Socket.io")
})

socket.on("disconnect", () => {
    console.log("Desconectando del servidor de Socket.io")
})

export default socket