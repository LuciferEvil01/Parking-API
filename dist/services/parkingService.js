"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParkingStatus = exports.reserveSpot = exports.findAvailableSpot = void 0;
const ParkingSpot_1 = require("../models/ParkingSpot");
const Reservation_1 = require("../models/Reservation");
const findAvailableSpot = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ParkingSpot_1.ParkingSpot.findOne({ isOccupied: false });
});
exports.findAvailableSpot = findAvailableSpot;
const reserveSpot = (user, parkingSpot, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    const spot = yield ParkingSpot_1.ParkingSpot.findById(parkingSpot);
    if (!spot || spot.isOccupied) {
        throw new Error('Parking spot is not available');
    }
    const reservation = new Reservation_1.Reservation({ user, parkingSpot, startTime, endTime });
    spot.isOccupied = true;
    yield reservation.save();
    yield spot.save();
    return reservation;
});
exports.reserveSpot = reserveSpot;
const getParkingStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield ParkingSpot_1.ParkingSpot.find({});
});
exports.getParkingStatus = getParkingStatus;
//# sourceMappingURL=parkingService.js.map