"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const authRoutes_1 = require("./routes/authRoutes");
const parkingRoutes_1 = require("./routes/parkingRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const logRoutes_1 = require("./routes/logRoutes");
const app = (0, express_1.default)();
exports.app = app;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.authRoutes);
app.use('/api/parking', parkingRoutes_1.parkingRoutes);
app.use('/api/users', userRoutes_1.userRoutes);
app.use('/api/logs', logRoutes_1.logRoutes);
// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Parking API',
            version: '1.0.0',
            description: 'API for managing a parking system',
        },
    },
    apis: ['./src/routes/*.ts'],
};
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
//# sourceMappingURL=app.js.map