import { Schema, model, Document, Types } from 'mongoose';

interface IReservation extends Document {
  user: Types.ObjectId;
  parkingSpot: Types.ObjectId;
  startTime: Date;
  endTime: Date;
}

const reservationSchema = new Schema<IReservation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parkingSpot: { type: Schema.Types.ObjectId, ref: 'ParkingSpot', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
}, { timestamps: true });

export const Reservation = model<IReservation>('Reservation', reservationSchema);
