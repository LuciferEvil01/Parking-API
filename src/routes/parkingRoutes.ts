import { Router } from 'express';
import { reserveSpot, getParkingStatus } from '../controllers/parkingController';
import { authenticate } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Parking
 *   description: API for managing parking spots
 */

/**
 * @swagger
 * /api/parking/reserve:
 *   post:
 *     summary: Reserve a parking spot
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spotId:
 *                 type: string
 *               userId:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Parking spot reserved successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/reserve', authenticate, reserveSpot);

/**
 * @swagger
 * /api/parking/status:
 *   get:
 *     summary: Get parking status
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current parking status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   spotId:
 *                     type: string
 *                   isOccupied:
 *                     type: boolean
 *                   userId:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/status', authenticate, authorize(['employee', 'admin']), getParkingStatus);

export { router as parkingRoutes };
