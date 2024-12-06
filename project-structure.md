src/
  ├── config/
  │   └── database.ts
  ├── controllers/
  │   ├── authController.ts
  │   ├── parkingController.ts
  │   ├── userController.ts
  │   └── logController.ts
  ├── middlewares/
  │   ├── authMiddleware.ts
  │   └── roleMiddleware.ts
  ├── models/
  │   ├── User.ts
  │   ├── ParkingSpot.ts
  │   ├── Reservation.ts
  │   └── Log.ts
  ├── routes/
  │   ├── authRoutes.ts
  │   ├── parkingRoutes.ts
  │   ├── userRoutes.ts
  │   └── logRoutes.ts
  ├── services/
  │   ├── authService.ts
  │   ├── parkingService.ts
  │   ├── userService.ts
  │   └── logService.ts
  ├── utils/
  │   ├── jwtUtils.ts
  │   └── logger.ts
  ├── app.ts
  └── server.ts
tests/
  └── e2e/
      ├── auth.test.ts
      ├── parking.test.ts
      └── user.test.ts
Dockerfile
docker-compose.yml
package.json
tsconfig.json
.env
.gitignore
README.md