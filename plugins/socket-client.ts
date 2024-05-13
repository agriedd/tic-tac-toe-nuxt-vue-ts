import { io } from 'socket.io-client';

//Socket Client
const socket = io('https://games.gmitdiaspora.org:3000', {
    autoConnect: true
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            io: socket
        }
    }
});