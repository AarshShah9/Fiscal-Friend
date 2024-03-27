import request from 'supertest';
import { Mortgage } from '../models';
import app from '../app';

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
    describe('Create Tests', () => {
      it('Should return 400 if user is not authenticated', async () => {
        const res = await request(app).post('/mortgage/create').send({
          mortgage: testMortgage.mortgage,
          frequency: testMortgage.frequency,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('User not authenticated');
      });

      it('Should return 400 if amount field is missing', async () => {
        const res = await agent.post('/mortgage/create').send({
          period: testMortgage.mortgage.period,
          apr: testMortgage.mortgage.apr,
          frequency: testMortgage.frequency,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });

      it('Should return 400 if required frequency field is missing', async () => {
        const res = await agent.post('/mortgage/create').send({
          amount: testMortgage.mortgage.amount,
          period: testMortgage.mortgage.period,
          apr: testMortgage.mortgage.apr,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });
      it('Should return 400 if required period field is missing', async () => {
        const res = await agent.post('/mortgage/create').send({
          amount: testMortgage.mortgage.amount,
          apr: testMortgage.mortgage.apr,
          frequency: testMortgage.frequency,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });
      it('Should return 400 if required apr field is missing', async () => {
        const res = await agent.post('/mortgage/create').send({
          amount: testMortgage.mortgage.amount,
          period: testMortgage.mortgage.period,
          frequency: testMortgage.frequency,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });

      it('Should create a new mortgage', async () => {
        const res = await agent.post('/mortgage/create').send({
          amount: 100000,
          apr: 5,
          period: 30,
          frequency: 'Monthly (12x per year)',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.mortgage).toBeDefined();
        expect(res.body.mortgage.mortgage.amount).toEqual(100000);
        expect(res.body.mortgage.mortgage.apr).toEqual(5);
        expect(res.body.mortgage.mortgage.period).toEqual(30);
        expect(res.body.mortgage.frequency).toEqual('Monthly (12x per year)');
      });
    });

    describe('Update Tests', () => {
      it('Should return 400 if user is not authenticated updated', async () => {
        const res = await request(app).put('/mortgage/update').send({
          mortgage: testMortgage.mortgage,
          frequency: testMortgage.frequency,
        });
  
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('User not authenticated');
      }); 

      it('Should return 400 if required amount field is misisng', async () => {
        const res = await agent.put('/mortgage/update').send({
          frequency: testMortgage.frequency,
          period: testMortgage.mortgage.period,
          apr: testMortgage.mortgage.apr,
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });

      it('Should return 400 if required frequency field are missing', async () => {
        const res = await agent.put('/mortgage/update').send({
          amount: testMortgage.mortgage.amount,
          period: testMortgage.mortgage.period,
          apr: testMortgage.mortgage.apr,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });

      it('Should return 400 if required period field are missing', async () => {
        const res = await agent.put('/mortgage/update').send({
          amount: testMortgage.mortgage.amount,
          frequency: testMortgage.frequency,
          apr: testMortgage.mortgage.apr,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });

      it('Should return 400 if required apr field are missing', async () => {
        const res = await agent.put('/mortgage/update').send({
          amount: testMortgage.mortgage.amount,
          period: testMortgage.mortgage.period,
          frequency: testMortgage.frequency,
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Invalid request body');
      });

      it('Should update mortgage', async () => {
        const res = await agent.put('/mortgage/update').send({
          amount: 150000,
          apr: 6,
          period: 25,
          frequency: 'Bi-Weekly (every 2 weeks)',
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.mortgage).toBeDefined();
        expect(res.body.mortgage.mortgage.amount).toEqual(150000);
        expect(res.body.mortgage.mortgage.apr).toEqual(6);
        expect(res.body.mortgage.mortgage.period).toEqual(25);
        expect(res.body.mortgage.frequency).toEqual('Bi-Weekly (every 2 weeks)');
      });
    });
  });
};
