
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { authRoutes } from './routes/authRoutes';
import { parkingRoutes } from './routes/parkingRoutes';
import { userRoutes } from './routes/userRoutes';
import { logRoutes } from './routes/logRoutes';
import {connectMongoDB}  from "./config/database"

const app = express();
connectMongoDB()
// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', logRoutes);

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

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export { app };
