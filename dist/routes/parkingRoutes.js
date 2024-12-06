"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parkingRoutes = void 0;
const express_1 = require("express");
const parkingController_1 = require("../controllers/parkingController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
exports.parkingRoutes = router;
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
router.post('/reserve', authMiddleware_1.authenticate, parkingController_1.reserveSpot);
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
router.get('/status', authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(['employee', 'admin']), parkingController_1.getParkingStatus);
//# sourceMappingURL=parkingRoutes.js.map