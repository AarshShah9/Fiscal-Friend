// Write a jest test to hit the /Test Endpoint
import request from 'supertest';
import app from '../server'; 
import { connectToDatabase } from '../db/conn';
import { Connection } from 'mongoose';
let mongoClient: Connection;

beforeAll(async() => {
  try{
    mongoClient = await connectToDatabase(process.env.ATLAS_URI!);
    console.log('Connected to the database:', mongoClient);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})

test('Initial Test', async () => {
  const res = await request(app).get('/test');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ message: 'Test Endpoint' });
});

afterAll(async () => {
  await mongoClient.close();
});
