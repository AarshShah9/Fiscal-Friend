// Write a jest test to hit the /Test Endpoint
import request from 'supertest';
import app, { mongoClient, server } from '../server';

test('Initial Test', async () => {
  const res = await request(app).get('/test');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual({ message: 'Test Endpoint' });
});

afterAll(async () => {
  server.close();
});
