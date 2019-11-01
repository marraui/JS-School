import SocketIO from 'socket.io';
export class SocketManager {
    initialize(server) {
        this.io = new SocketIO(server);
        this.onConnection = this.onConnection.bind(this);
        this.onSubscribe = this.onSubscribe.bind(this);
        this.io.on('connection', this.onConnection);
    }

    onConnection(socket) {
        console.log(`Socket manager -> new connection`);
        socket.on('subscribe', (room) => this.onSubscribe(socket, room));
    }

    onSubscribe(socket, room) {
        console.log(`Socket manager -> subscribing to ${room} room`);
        socket.join(room);
    }

    emitMessage(room, event, message) {
        console.log(`Socket manager -> emitting message to ${room}`);
        console.log(message);
        this.io.to(room).emit(event, message);
    }
}

export const socketManager = new SocketManager();