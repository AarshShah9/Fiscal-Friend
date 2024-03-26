import request from 'supertest';
import { Mortgage } from '../models';
import { createSecretToken } from '../utils/secretToken';

const testMortgage = {
  _id: null,
  mortgage: {
    amount: 100000,
    apr: 5,
    period: 30,
  },

  frequency: 'Monthly (12x per year)',
};

export const mortgageTests = (agent: request.Agent) => {
  beforeAll(async () => {
    await Mortgage.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
  });
  afterAll(async () => {
    await Mortgage.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
  });

  describe('Mortgage Tests', () => {
    it('Should return 400 if user is not authenticated created', async () => {
      agent.set('Cookie', '');

      const res = await agent.post('/mortgage/create').send({
        mortgage: testMortgage.mortgage,
        frequency: testMortgage.frequency,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User not authenticated');

      const TEST_USER_ID = '65e7b7d3b57aa86390016afb';
      const token = createSecretToken(TEST_USER_ID);
      agent.set('Cookie', `token=${token}`);
    });

    it('Should return 400 if required mortgage field are missing created', async () => {
      const res = await agent.post('/mortgage/create').send({
        frequency: testMortgage.frequency,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });

    it('Should return 400 if required frequency field are missing created', async () => {
      const res = await agent.post('/mortgage/create').send({
        mortgage: {},
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });

    it('Should create a new mortgage', async () => {
      console.log('testMortgage', testMortgage);
      const res = await agent.post('/mortgage/create').send({
        mortgage: {},
        amount: 100000,
        apr: 5,
        period: 30,
        frequency: 'Monthly (12x per year)',
      });
      console.log(res.body);
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
    });

    it('Should return 400 if user is not authenticated updated', async () => {
      agent.set('Cookie', '');

      const res = await agent.put('/mortgage/update').send({
        mortgage: testMortgage.mortgage,
        frequency: testMortgage.frequency,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User not authenticated');

      const TEST_USER_ID = '65e7b7d3b57aa86390016afb';
      const token = createSecretToken(TEST_USER_ID);
      agent.set('Cookie', `token=${token}`);
    });

    it('Should return 400 if required mortgage field are missing updated', async () => {
      const res = await agent.put('/mortgage/update').send({
        frequency: testMortgage.frequency,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });

    it('Should return 400 if required frequency field are missing updated', async () => {
      const res = await agent.put('/mortgage/update').send({
        mortgage: {},
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });

    it('Should update mortgage', async () => {
      const res = await agent.put('/mortgage/update').send({
        mortgage: {},
        amount: 100000,
        apr: 5,
        period: 30,
        frequency: 'Monthly (12x per year)',
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
    });
  });
};