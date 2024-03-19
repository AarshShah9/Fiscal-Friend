import request from 'supertest';

const testIncome1 = {
    _id: null,
    name: 'Test income',
    amount: 1000,
    date: '2021-01-01',
    recurring: 'One-time',
};


export const incomeTests = (agent: request.Agent) => {
    describe('Income Tests', () => {
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