import request from 'supertest';
import { Stock } from '../models';

const testStock = {
  _id: null,
  symbol: 'IBM',
  boughtPrice: 0,
  quantity: 0,
};

const testStock2 = {
  _id: null,
  symbol: 'AAPL',
  boughtPrice: 200,
  quantity: 5,
};

export const stockTests = (agent: request.Agent) => {
  beforeAll(async () => {
    await Stock.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
  });
  afterAll(async () => {
    await Stock.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
  });
  describe('Stock Tests', () => {
    it('Should return an error if symbol is missing', async () => {
      const res = await agent.post('/stock/save').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });
    it('Should return an error if symbol, price, or quantity missing', async () => {
      const res = await agent.post('/stock/saveBought').send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toEqual(false);
      expect(res.body.message).toEqual('Invalid request body');
    });
    it('Should request API for stock data', async () => {
      const res = await agent.post('/stock/search').send({ symbol: 'AAPL' });
      expect(res.statusCode).toEqual(200);
      expect(res.body.dataList).toBeDefined();
    });
    it('should create a new stock', async () => {
      const res = await agent.post('/stock/save').send(testStock);
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Stock saved');
      expect(res.body.stock.symbol).toEqual('IBM');
      testStock._id = res.body.stock._id;
    });
    it('should return error because stock is already saved', async () => {
      const res = await agent.post('/stock/save').send(testStock);
      expect(res.statusCode).toEqual(500);
      expect(res.body.success).toEqual(false);
    });
    it('Should get saved stock symbols', async () => {
      const res = await agent.post('/stock/get').send({});
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.stocks.length).toBeGreaterThan(0);
      expect(res.body.stocks[0].symbol).toEqual('IBM');
      expect(res.body.stocks[0].boughtPrice).toEqual(0); // regardless of what is set for test should return default 0
      expect(res.body.stocks[0].quantity).toEqual(0); // same as above
    });
    it('Should return stock does not exist', async () => {
      const res = await agent.post('/stock/getSymbol').send({ symbol: 'PPP' });
      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toEqual(false);
    });
  });
};
