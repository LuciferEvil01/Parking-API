"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSpot = void 0;
const mongoose_1 = require("mongoose");
const parkingSpotSchema = new mongoose_1.Schema({
    spotNumber: { type: String, required: true, unique: true },
    isOccupied: { type: Boolean, default: false }
}, { timestamps: true });
exports.ParkingSpot = (0, mongoose_1.model)('ParkingSpot', parkingSpotSchema);
//# sourceMappingURL=ParkingSpot.js.map