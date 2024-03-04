// Write a jest test to hit the /Test Endpoint
import request from 'supertest';
import app from '../app'; 
import { connectToDatabase } from '../db/conn';
import { Connection } from 'mongoose';
const agent = request.agent(app);

// Import tests
import { authTests } from './auth';
import User from '../models/User';

let mongoClient: Connection;

beforeAll(async() => {
  try{
    mongoClient = await connectToDatabase(process.env.ATLAS_URI!);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }

  // Create a new user
  const newUser = await agent.post('/auth/register').send({
    email: 'testuser@fiscalfriend.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
  });
  expect(newUser.statusCode).toEqual(201);
  
  // Log agent in
  const res = await agent.post('/auth/login').send({
    email: 'testuser@fiscalfriend.com',
    password: 'password',
  });
  expect(res.statusCode).toEqual(201);
})

describe('Fiscal Friend API Tests', () => {
  authTests();
});

afterAll(async () => {
  // Delete the test user
  await User.deleteMany({ email: 'testuser@fiscalfriend.com' });
  await mongoClient.close();
});
