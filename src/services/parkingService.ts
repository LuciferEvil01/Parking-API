import { ParkingSpot } from '../models/ParkingSpot';
import { Reservation } from '../models/Reservation';

export const findAvailableSpot = async () => {
  return await ParkingSpot.findOne({ isOccupied: false });
};

export const reserveSpot = async (user: string, parkingSpot: string, startTime: Date, endTime: Date) => {
  const spot = await ParkingSpot.findById(parkingSpot);
  if (!spot || spot.isOccupied) {
    throw new Error('Parking spot is not available');
  }

  const reservation = new Reservation({ user, parkingSpot, startTime, endTime });
  spot.isOccupied = true;

  await reservation.save();
  await spot.save();

  return reservation;
};

export const getParkingStatus = async () => {
  return await ParkingSpot.find({});
};
