import request from 'supertest';
import app from '../app';
import { SavingsModel } from '../models/SavingsModel';

const testSavings1 = {
  _id: null,
  savingAccount: {
    chequing: 100,
    savings: 200,
    resp: 300,
  },
  loanAccount: {
    loc: 400,
    mortgage: 500,
  },
};

export const savingsTests = (agent: request.Agent) => {
  beforeAll(async () => {
    await SavingsModel.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
  });

  afterAll(async () => {
    await SavingsModel.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
  });

  describe('Savings Tests', () => {
    it('Should return an error if chequing is missing', async () => {
      const res = await agent.post('/savings/create').send({
        savings: testSavings1.savingAccount.savings,
        resp: testSavings1.savingAccount.resp,
        loc: testSavings1.loanAccount.loc,
        mortgage: testSavings1.loanAccount.mortgage,
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });

    it('Should return an error if savings is missing', async () => {
      const res = await agent.post('/savings/create').send({
        chequing: testSavings1.savingAccount.chequing,
        resp: testSavings1.savingAccount.resp,
        loc: testSavings1.loanAccount.loc,
        mortgage: testSavings1.loanAccount.mortgage,
      });
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });

    it('Should return a value of undefined if resp is missing', async () => {
      const res = await agent.post('/savings/create').send({
        chequing: testSavings1.savingAccount.chequing,
        savings: testSavings1.savingAccount.savings,
        loc: testSavings1.loanAccount.loc,
        mortgage: testSavings1.loanAccount.mortgage,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.savings.savingAccount.resp).toEqual(undefined);
    });

    it('Should return a value of undefined if loc is missing', async () => {
      const res = await agent.post('/savings/create').send({
        chequing: testSavings1.savingAccount.chequing,
        savings: testSavings1.savingAccount.savings,
        resp: testSavings1.savingAccount.resp,
        mortgage: testSavings1.loanAccount.mortgage,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.savings.loanAccount.loc).toEqual(undefined);
    });

    it('Should return a value of undefined if mortgage is missing', async () => {
      const res = await agent.post('/savings/create').send({
        chequing: testSavings1.savingAccount.chequing,
        savings: testSavings1.savingAccount.savings,
        resp: testSavings1.savingAccount.resp,
        loc: testSavings1.loanAccount.loc,
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.savings.loanAccount.mortgage).toEqual(undefined);
    });

    it('Should update the savings account', async () => {
      const updatesTest = {
        chequing: 1500,
        savings: 2500,
        resp: 3500,
        loc: 4500,
        mortgage: 5500,
      };

      const res = await agent.put('/savings/update').send(updatesTest);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
    });

    it('Should return error when the user ID is missing for update', async () => {
      const res = await request(app).put('/savings/update').send(testSavings1);

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User not authenticated');
    });

    it('Should return error when the user ID is missing for creating', async () => {
      const res = await request(app).post('/savings/create').send({
        chequing: testSavings1.savingAccount.chequing,
        savings: testSavings1.savingAccount.savings,
        resp: testSavings1.savingAccount.resp,
        loc: testSavings1.loanAccount.loc,
        mortgage: testSavings1.loanAccount.mortgage,
      });

      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('User not authenticated');
    });
  });
};
