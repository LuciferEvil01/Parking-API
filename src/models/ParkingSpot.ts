import { Schema, model, Document } from 'mongoose';

interface IParkingSpot extends Document {
    spotNumber: string;
    isOccupied: boolean;
}

const parkingSpotSchema = new Schema<IParkingSpot>({
    spotNumber: { type: String, required: true, unique: true },
    isOccupied: { type: Boolean, default: false }
}, { timestamps: true });

export const ParkingSpot = model<IParkingSpot>('ParkingSpot', parkingSpotSchema);
