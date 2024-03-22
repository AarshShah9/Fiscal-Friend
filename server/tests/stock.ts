import request from 'supertest';
import { Stock } from '../models';

const testStock = {
  _id: null,
  symbol: 'IBM',
  boughtPrice: 100,
  quantity: 10,
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
    it('should create a new stock', async () => {
      const res = await agent.post('/stock/save').send(testStock);
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Stock saved');
      expect(res.body.stock.name).toEqual('IBM');
      testStock._id = res.body.stock._id;
    });
    it('should store new bought stock', async () => {
      const res = await agent.post('/stock/saveBought').send(testStock);
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.message).toEqual('Stock saved');
      expect(res.body.stock.symbol).toEqual('IBM');
      expect(res.body.stock.boughtPrice).toEqual(100);
      expect(res.body.stock.quantity).toEqual(10);
      testStock._id = res.body.stock._id;
    });
    it('Should get saved stock symbols', async () => {
      const res = await agent.post('/stock/get').send({});
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
    });
    it('Should remove stock symbol', async () => {
      const res = await agent.post('/stock/remove').send({});
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toEqual(true);
      expect(res.body.success).toEqual('Stock removed');
    });
    it('Should get saved symbols and search them', async () => {
      const res = await agent.post('/stock/searchFavourites').send({});
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toEqual(true);
      expect(res.body.success).toEqual('Requested user favorites from API');
    });
  });
};
