import { Request, Response } from 'express';
import { ParkingSpot } from '../models/ParkingSpot';
import { Reservation } from '../models/Reservation';

export const reserveSpot = async (req: Request, res: Response) => {
  try {
    const { user, parkingSpot, startTime, endTime } = req.body;
    const spot = await ParkingSpot.findById(parkingSpot);

    if (!spot || spot.isOccupied) {
      return res.status(400).send({ error: 'Parking spot is not available' });
    }

    const reservation = new Reservation({ user, parkingSpot, startTime, endTime });
    spot.isOccupied = true;

    await reservation.save();
    await spot.save();

    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getParkingStatus = async (req: Request, res: Response) => {
  try {
    const spots = await ParkingSpot.find({});
    res.send(spots);
  } catch (error) {
    res.status(500).send();
  }
};
