const Server = require('./src/models/server');

require('dotenv').config();

const server = new Server();
console.log('Servidor iniciado en el puerto:', server.port);

server.listen();

