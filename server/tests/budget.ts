import request from 'supertest';
import { Expense, Income } from '../models';

interface IBudget {
    income: Number;
    expenses: {
        total: Number;
        itemized: {
            food: Number;
            rent?: Number;
            utilities: Number;
            transportation: Number;
            insurance: Number;
            wellness: Number;
            entertainment: Number;
            other: Number;
            mortgage?: Number;
            creditCard?: Number;
            savings?: Number;
        };
    };
    recommendedBudget: {
        food: Number;
        utilities: Number;
        transportation: Number;
        insurance: Number;
        wellness: Number;
        entertainment: Number;
        other: Number;
        savings?: Number;
    };
};

// Test data
const oneTimeExpense = {
    name: 'Test expense 1',
    user: '65e7b7d3b57aa86390016afb',
    amount: 1000,
    date: new Date(),
    recurring: 'One-time',
    category: 'Food'
};

const oneTimeExpenseOld = {
    name: 'Test expense 2',
    user: '65e7b7d3b57aa86390016afb',
    amount: 2000,
    date: '2020-01-01',
    recurring: 'One-time',
    category: 'Food'
};

const recurringExpenseWeekly = {
    name: 'Test expense 3',
    user: '65e7b7d3b57aa86390016afb',
    amount: 200,
    recurring: 'Weekly',
    category: 'Transportation'
};

const recurringExpenseBiWeekly = {
    name: 'Test expense 4',
    user: '65e7b7d3b57aa86390016afb',
    amount: 200,
    recurring: 'Bi-Weekly',
    category: 'Utilities',
};

const recurringExpenseMonthly = {
    name: 'Test expense 5',
    user: '65e7b7d3b57aa86390016afb',
    amount: 200,
    recurring: 'Monthly',
    category: 'Insurance',
};

const recurringExpenseQuarterly = {
    name: 'Test expense 6',
    user: '65e7b7d3b57aa86390016afb',
    amount: 200,
    recurring: 'Quarterly',
    category: 'Wellness'
};

const recurringExpenseAnnually = {
    name: 'Test expense 7',
    user: '65e7b7d3b57aa86390016afb',
    amount: 1200,
    recurring: 'Annually',
    category: 'Entertainment',
};

const otherExpense = {
    name: 'Test expense 8',
    user: '65e7b7d3b57aa86390016afb',
    date: new Date(),
    amount: 200,
    recurring: 'One-time',
    category: 'Other'
};


const oneTimeIncome = {
    name: 'Test income 1',
    user: '65e7b7d3b57aa86390016afb',
    amount: 1000,
    date: new Date(),
    recurring: 'One-time',
};

const oneTimeIncomeOld = {
    name: 'Test income 2',
    user: '65e7b7d3b57aa86390016afb',
    amount: 2000,
    date: '2020-01-01',
    recurring: 'One-time',
};

const recurringIncome = {
    name: 'Test income 3',
    user: '65e7b7d3b57aa86390016afb',
    amount: 2000,
    recurring: 'Weekly',
};

const expected: IBudget = {
    income: 9000,
    expenses: {
        total: 2766.67,
        itemized: {
            food: 1000,
            utilities: 400,
            transportation: 800,
            insurance: 200,
            wellness: 66.67,
            entertainment: 100,
            other: 200,
            rent: 0,
        },
    },
    recommendedBudget: {
        "entertainment": 540, 
        "food": 1350, 
        "insurance": 450, 
        "other": 540, 
        "savings": 3600, 
        "transportation": 900, 
        "utilities": 1350, 
        "wellness": 450
    },
};



export const budgetTests = (agent: request.Agent) => {
    describe('Budget Tests', () => {
        beforeAll(async () => {
            await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });

            // Create test expenses and incomes
            try {
                await Expense.create(oneTimeExpense);
                await Expense.create(oneTimeExpenseOld);
                await Expense.create(recurringExpenseWeekly);
                await Expense.create(recurringExpenseBiWeekly);
                await Expense.create(recurringExpenseMonthly);
                await Expense.create(recurringExpenseQuarterly);
                await Expense.create(recurringExpenseAnnually);
                await Expense.create(otherExpense);
                await Income.create(oneTimeIncome);
                await Income.create(oneTimeIncomeOld);
                await Income.create(recurringIncome);
            } catch (error) {
                console.error('Failed to create test expenses and incomes:', error);
            }
        }, 30000);
        
        afterAll(async () => {
            await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
        });

        it('Should correctly return a budget', async () => {
            const res = await agent.post('/budget/budget');
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.budget).toEqual(expected);
        });
    });
};