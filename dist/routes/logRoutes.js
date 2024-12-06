"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRoutes = void 0;
const express_1 = require("express");
const logController_1 = require("../controllers/logController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
exports.logRoutes = router;
/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: API for managing logs
 */
/**
 * @swagger
 * /api/logs:
 *   get:
 *     summary: Get all activity logs
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of activity logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   message:
 *                     type: string
 *                   timestamp:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', authMiddleware_1.authenticate, (0, roleMiddleware_1.authorize)(['admin']), logController_1.getLogs);
//# sourceMappingURL=logRoutes.js.map