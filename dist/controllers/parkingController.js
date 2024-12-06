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
exports.getParkingStatus = exports.reserveSpot = void 0;
const ParkingSpot_1 = require("../models/ParkingSpot");
const Reservation_1 = require("../models/Reservation");
const reserveSpot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, parkingSpot, startTime, endTime } = req.body;
        const spot = yield ParkingSpot_1.ParkingSpot.findById(parkingSpot);
        if (!spot || spot.isOccupied) {
            return res.status(400).send({ error: 'Parking spot is not available' });
        }
        const reservation = new Reservation_1.Reservation({ user, parkingSpot, startTime, endTime });
        spot.isOccupied = true;
        yield reservation.save();
        yield spot.save();
        res.status(201).send(reservation);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.reserveSpot = reserveSpot;
const getParkingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spots = yield ParkingSpot_1.ParkingSpot.find({});
        res.send(spots);
    }
    catch (error) {
        res.status(500).send();
    }
});
exports.getParkingStatus = getParkingStatus;
//# sourceMappingURL=parkingController.js.map