import { app } from './app';
import http from 'http';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';


// Cargar variables de entorno desde el archivo .env
dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Manejar eventos de servidor
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Manejar errores específicos del servidor
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = addr ? (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`) : 'unknown port';
  console.log(`Listening on ${bind}`);
});
