import { io } from 'socket.io-client';

//Socket Client
const socket = io('https://games.gmitdiaspora.org', {
    autoConnect: true
});

export default defineNuxtPlugin(() => {
    return {
        provide: {
            io: socket
        }
    }
});