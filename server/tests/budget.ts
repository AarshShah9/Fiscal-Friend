import request from 'supertest';
import { Expense, Income, Mortgage } from '../models';

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
    name: 'Test expense 9',
    user: '65e7b7d3b57aa86390016afb',
    amount: 200,
    recurring: 'Bi-Weekly',
    category: 'Savings'
};

const recurringExpenseSemiMonthly = {
    name: 'Test expense 4',
    user: '65e7b7d3b57aa86390016afb',
    amount: 200,
    recurring: 'Semi-Monthly',
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

const mortgage = {
    user: '65e7b7d3b57aa86390016afb',
    mortgage: {
      amount: 200000,
      apr: 4.5,
      period: 30,
    },
    payments: {
      epr: 0.00375,
      interestPayment: 750,
      firstPayment: 1000,
      payment: 1500,
    },
    frequency: 'Monthly (12x per year)',
};

const expected: IBudget = {
    income: 9000,
    expenses: {
        total: 4700,
        itemized: {
            food: 1000,
            utilities: 400,
            transportation: 800,
            insurance: 200,
            wellness: 66.67,
            entertainment: 100,
            other: 200,
            rent: 0,
            savings: 433.33,
            mortgage: 1500,
        },
    },
    recommendedBudget: {
        "entertainment": 450,
        "food": 1125,
        "insurance": 375,
        "other": 450,
        "savings": 3000,
        "transportation": 750,
        "utilities": 1125,
        "wellness": 375,
    },
};



export const budgetTests = (agent: request.Agent) => {
    describe('Budget Tests', () => {
        beforeAll(async () => {
            await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Mortgage.deleteMany({ user: '65e7b7d3b57aa86390016afb' });

            // Create test expenses and incomes
            try {
                await Expense.create(oneTimeExpense);
                await Expense.create(oneTimeExpenseOld);
                await Expense.create(recurringExpenseWeekly);
                await Expense.create(recurringExpenseBiWeekly);
                await Expense.create(recurringExpenseSemiMonthly);
                await Expense.create(recurringExpenseMonthly);
                await Expense.create(recurringExpenseQuarterly);
                await Expense.create(recurringExpenseAnnually);
                await Expense.create(otherExpense);
                await Income.create(oneTimeIncome);
                await Income.create(oneTimeIncomeOld);
                await Income.create(recurringIncome);
                await Mortgage.create(mortgage);
            } catch (error) {
                console.error('Failed to create test expenses and incomes:', error);
            }
        }, 30000);
        
        afterAll(async () => {
            await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Mortgage.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
        });

        it('Should correctly return a budget', async () => {
            const res = await agent.post('/budget/budget');
            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.budget).toEqual(expected);
        });
    });
};