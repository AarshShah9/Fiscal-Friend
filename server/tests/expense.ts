import request from 'supertest';
import { Expense } from '../models';
import app from '../app';

const testExpense = {
    _id: null,
    name: 'Test income',
    amount: 1000,
    date: '2021-01-01',
    recurring: 'One-time',
    category: 'Food'
};

const testExpense2 = {
    _id: null,
    name: 'Test income 2',
    amount: 2000,
    date: '2021-01-02',
    recurring: 'Weekly',
    category: 'Transportation'
};


export const expenseTests = (agent: request.Agent) => {
    beforeAll(async () => {
        await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
    });
    afterAll(async () => {
        await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
    });
    describe('Expense Tests', () => {
        describe('Creation Tests',() => {
            it('should return an error if user is not authenticated', async () => {
                const res = await request(app).post('/expense/create').send({
                    name: testExpense.name,
                    amount: testExpense.amount,
                    date: testExpense.date,
                    recurring: testExpense.recurring,
                    category: testExpense.category,
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('User not authenticated');
            });
            it('should return an error if name is missing', async () => {
                const res = await agent.post('/expense/create').send({
                    amount: testExpense.amount,
                    date: testExpense.date,
                    recurring: testExpense.recurring,
                    category: testExpense.category,
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('Invalid request body');
            });
            it('should return an error if amount is missing', async () => {
                const res = await agent.post('/expense/create').send({
                    name: testExpense.name,
                    date: testExpense.date,
                    recurring: testExpense.recurring,
                    category: testExpense.category,
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('Invalid request body');
            });
            it('should return an error if date is missing', async () => {
                const res = await agent.post('/expense/create').send({
                    name: testExpense.name,
                    amount: testExpense.amount,
                    recurring: testExpense.recurring,
                    category: testExpense.category,
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('Invalid request body');
            });
            it('should return an error if recurring is missing', async () => {
                const res = await agent.post('/expense/create').send({
                    name: testExpense.name,
                    amount: testExpense.amount,
                    date: testExpense.date,
                    category: testExpense.category,
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('Invalid request body');
            });
            it('should return an error if category is missing', async () => {
                const res = await agent.post('/expense/create').send({
                    name: testExpense.name,
                    amount: testExpense.amount,
                    date: testExpense.date,
                    recurring: testExpense.recurring,
                });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('Invalid request body');
            });
            it('should create an expense', async () => {
                const res = await agent.post('/expense/create').send(testExpense);
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.expense.name).toEqual('Test income');
                expect(res.body.expense.amount).toEqual(1000);
                expect(res.body.expense.date).toEqual('2021-01-01T00:00:00.000Z');
                expect(res.body.expense.recurring).toEqual('One-time');
                expect(res.body.expense.category).toEqual('Food');
                expect(res.body.expense.user).toEqual('65e7b7d3b57aa86390016afb');
                testExpense._id = res.body.expense._id;
            });
            it('should create an expense without a date if recurring is not One-time', async () => {
                const res = await agent.post('/expense/create').send(testExpense2);
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.expense.name).toEqual('Test income 2');
                expect(res.body.expense.amount).toEqual(2000);
                expect(res.body.expense.recurring).toEqual('Weekly');
                expect(res.body.expense.category).toEqual('Transportation');
                expect(res.body.expense.user).toEqual('65e7b7d3b57aa86390016afb');
            });
        });
        describe('Get Tests', () => {
            it('should return an error if user is not authenticated', async () => {
                const res = await request(app).post('/expense/get');
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('User not authenticated');
            });
            it('should get expenses', async () => {
                const res = await agent.post('/expense/get').send({ user: '65e7b7d3b57aa86390016afb' });
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.expenses).toHaveLength(2);
                expect(res.body.expenses[0].name).toEqual('Test income');
                expect(res.body.expenses[0].amount).toEqual(1000);
                expect(res.body.expenses[0].date).toEqual('2021-01-01T00:00:00.000Z');
                expect(res.body.expenses[0].recurring).toEqual('One-time');
                expect(res.body.expenses[0].category).toEqual('Food');
                expect(res.body.expenses[0].user).toEqual('65e7b7d3b57aa86390016afb');
                expect(res.body.expenses[1].name).toEqual('Test income 2');
                expect(res.body.expenses[1].amount).toEqual(2000);
                expect(res.body.expenses[1].recurring).toEqual('Weekly');
                expect(res.body.expenses[1].category).toEqual('Transportation');
            });
        })
        describe('Remove Tests', () => {
            it('should return an error if user is not authenticated', async () => {
                const res = await request(app).post('/expense/remove');
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('User not authenticated');
            });
            it('should remove an expense', async () => {
                const res = await agent.post('/expense/remove')
                    .send({ expense: testExpense._id });
                expect(res.statusCode).toEqual(201);
                expect(res.body.success).toEqual(true);
                expect(res.body.message).toEqual('Expense removed');
            });
            it('Should return an error if the expense does not exist', async () => {
                const res = await agent.post('/expense/remove')
                    .send({ expense: testExpense._id });
                expect(res.statusCode).toEqual(400);
                expect(res.body.success).toEqual(false);
                expect(res.body.message).toEqual('Expense not found');
            });
        });
    });
};