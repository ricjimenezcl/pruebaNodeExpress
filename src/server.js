const app = require('./app');
const sequelize = require('./config/database');
const Task = require('./models/task.model');
const socketService = require('./services/socket.service');

const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('Base de datos conectada y sincronizada');
    
    const server = app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    
    socketService.initialize(server);
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });