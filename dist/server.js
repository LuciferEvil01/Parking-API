"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.app);
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Manejar eventos de servidor
server.on('error', (error) => {
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
//# sourceMappingURL=server.js.map