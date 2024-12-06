
import request from 'supertest';
import { app } from '../../src/app';
import { User } from '../../src/models/User';
import { ParkingSpot } from '../../src/models/ParkingSpot';

describe('Parking API', () => {
  let token: string;

  beforeAll(async () => {
    // Create a test user and get JWT token
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'client'
    });
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    token = response.body.token;

    // Create some parking spots
    await ParkingSpot.create([
      { spotNumber: 'A1', isOccupied: false },
      { spotNumber: 'A2', isOccupied: false },
      { spotNumber: 'A3', isOccupied: true }
    ]);
  });

  test('Reserve a parking spot', async () => {
    const response = await request(app)
      .post('/api/parking/reserve')
      .set('Authorization', `Bearer ${token}`)
      .send({
        vehicleDetails: { plate: 'ABC123', model: 'Tesla Model 3' },
        reservationDateTime: new Date()
      });

    expect(response.status).toBe(201);
    expect(response.body.reservation).toBeDefined();
  });

  test('Get parking occupancy', async () => {
    const response = await request(app)
      .get('/api/parking/occupancy')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.occupiedSpots).toBe(2);
    expect(response.body.totalSpots).toBe(3);
    expect(response.body.occupancyRate).toBe(66.67);
  });

  // Add more tests for other endpoints...
});