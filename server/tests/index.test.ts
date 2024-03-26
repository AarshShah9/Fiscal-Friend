// Write a jest test to hit the /Test Endpoint
import request from 'supertest';
import app from '../app';
import { connectToDatabase } from '../db/conn';
import { Connection } from 'mongoose';
import { createSecretToken } from '../utils/secretToken';
const agent = request.agent(app);

// Import tests
import { authTests } from './auth';
import { incomeTests } from './income';
import { expenseTests } from './expense';
import { transactionTests } from './transaction';
import { budgetTests } from './budget';
import { stockTests } from './stock';
import { savingsTests } from './savings';
import { mortgageTests } from './mortgage';

let mongoClient: Connection;

beforeAll(async () => {
  try {
    mongoClient = await connectToDatabase(process.env.ATLAS_URI!);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }

  const TEST_USER = {
    email: 'testuser@fiscalfriend.com',
    password: 'password',
    firstName: 'Test',
    lastName: 'User',
    _id: '65e7b7d3b57aa86390016afb',
  };
  // Create jwt
  const token = createSecretToken(TEST_USER._id);

  // attatch token to the agent
  agent.set('Cookie', `token=${token}`);
});

describe('Fiscal Friend API Tests', () => {
  authTests();
  incomeTests(agent);
  expenseTests(agent);
  transactionTests(agent);
  budgetTests(agent);
  // stockTests(agent);
  // savingsTests(agent);
  // mortgageTests(agent);
});

afterAll(async () => {
  // Delete the test user
  await mongoClient.close();
});
