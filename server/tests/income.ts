import request from 'supertest';
import { Income } from '../models';

const testIncome1 = {
    _id: null,
    name: 'Test income',
    amount: 1000,
    date: '2021-01-01',
    recurring: 'One-time',
};

const testIncome2 = {
    _id: null,
    name: 'Test income 2',
    amount: 2000,
    date: '2021-01-02',
    recurring: 'Weekly',
};


export const incomeTests = (agent: request.Agent) => {
    beforeAll(async () => {
        await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
    });
    afterAll(async () => {
        await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
    });
    describe('Income Tests', () => {
        it('Should return an error if name is missing', async () => {
            const res = await agent.post('/income/create').send({
                amount: testIncome1.amount,
                date: testIncome1.date,
                recurring: testIncome1.recurring,
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('Invalid request body');
        });
        it('Should return an error if amount is missing', async () => {
            const res = await agent.post('/income/create').send({
                name: testIncome1.name,
                date: testIncome1.date,
                recurring: testIncome1.recurring,
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('Invalid request body');
        });
        it('Should return an error if date is missing and recurring is One-Time', async () => {
            const res = await agent.post('/income/create').send({
                name: testIncome1.name,
                amount: testIncome1.amount,
                recurring: testIncome1.recurring,
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('Invalid request body');
        });
        it('Should return an error if recurring is missing', async () => {
            const res = await agent.post('/income/create').send({
                name: testIncome1.name,
                amount: testIncome1.amount,
                date: testIncome1.date,
            });
            expect(res.statusCode).toEqual(400);
            expect(res.body.success).toEqual(false);
            expect(res.body.message).toEqual('Invalid request body');
        });
        it('should create a new income', async () => {
            const res = await agent.post('/income/create').send(testIncome1);
            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toEqual(true);
            expect(res.body.message).toEqual('Income created');
            expect(res.body.income.name).toEqual('Test income');
            expect(res.body.income.amount).toEqual(1000);
            expect(res.body.income.date).toEqual('2021-01-01T00:00:00.000Z');
            expect(res.body.income.recurring).toEqual('One-time');
            testIncome1._id = res.body.income._id;
        });
        it("Doesnt require a date if recurring is not 'One-time'", async () => {
            const res = await agent.post('/income/create').send(testIncome2);
            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toEqual(true);
            expect(res.body.message).toEqual('Income created');
            expect(res.body.income.name).toEqual('Test income 2');
            expect(res.body.income.amount).toEqual(2000);
            expect(res.body.income.date).toBeUndefined();
            expect(res.body.income.recurring).toEqual('Weekly');
            testIncome2._id = res.body.income._id;
        });
        it('should get incomes', async () => {
            const res = await agent.post('/income/get').send();
            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toEqual(true);
            expect(res.body.incomes.length).toBeGreaterThan(0);
            expect (res.body.incomes[0].name).toEqual('Test income');
            expect (res.body.incomes[0].amount).toEqual(1000);
            expect (res.body.incomes[0].date).toEqual('2021-01-01T00:00:00.000Z');
            expect (res.body.incomes[0].recurring).toEqual('One-time');
        });
        it('should remove an income', async () => {
            const res = await agent.post('/income/remove').send({
                id: testIncome1._id,
            });
            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toEqual(true);
            expect(res.body.message).toEqual('Income removed');
        });
    });
};