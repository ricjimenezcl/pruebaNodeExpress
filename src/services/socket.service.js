let io;

const initialize = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};

const emitTaskUpdate = (event, payload) => {
  if (io) {
    console.log(`Emitting ${event} event`);
    io.emit(event, payload);
  }
};

module.exports = {
  initialize,
  emitTaskUpdate
};