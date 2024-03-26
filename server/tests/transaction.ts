import request from 'supertest';
import { Expense, Income, Mortgage } from '../models';

interface ITransaction {
    id: string,
    name: string,
    date: Date | undefined,
    amount: number,
    category: string | null,
    icon: 'in' | 'out',
    recurring: string,
}

interface IFormattedTransactions {
    date: string,
    transactions: ITransaction[],
}

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
    date: new Date('2020-01-01'),
    recurring: 'One-time',
    category: 'Food'
};

const recurringExpense = {
    name: 'Test expense 3',
    user: '65e7b7d3b57aa86390016afb',
    amount: 3000,
    recurring: 'Weekly',
    category: 'Transportation'
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
    date: new Date('2020-01-01'),
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

const currentDate = new Date();
const dayOfMonth = currentDate.getDate();
const numWeeks = Math.floor(dayOfMonth / 7);

export const transactionTests = (agent: request.Agent) => {
    describe('Transaction Tests', () => {
        beforeAll(async () => {
            await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Mortgage.deleteMany({ user: '65e7b7d3b57aa86390016afb' });

            // Create test expenses and incomes
            try {
                await Expense.create(oneTimeExpense);
                await Expense.create(oneTimeExpenseOld);
                await Expense.create(recurringExpense);
                await Income.create(oneTimeIncome);
                await Income.create(oneTimeIncomeOld);
                await Income.create(recurringIncome);
                await Mortgage.create(mortgage);
            } catch (error) {
                console.error('Failed to create test expenses and incomes:', error);
            }
        });
        
        afterAll(async () => {
            await Expense.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Income.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
            await Mortgage.deleteMany({ user: '65e7b7d3b57aa86390016afb' });
        });

        it('Should correctly return all transactions for the current month', async () => {
            const res = await agent.post('/transaction/get');
            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toEqual(true);
            const formattedTransactions: IFormattedTransactions[] = res.body.formattedTransactions;
            expect(formattedTransactions.length).toBeGreaterThanOrEqual(1);
            let names: string[] = [];
            formattedTransactions.forEach((formattedTransaction) => {
                formattedTransaction.transactions.forEach((transaction) => {
                    names.push(transaction.name);
                });
            });
            const expectedLength = 3 + (2 * numWeeks);
            expect(names.length).toBe(expectedLength);
            expect(names).toContain(oneTimeExpense.name);
            expect(names).toContain(oneTimeIncome.name);
            expect(names).toContain(recurringExpense.name);
            expect(names).toContain(recurringIncome.name);
            expect(names).not.toContain(oneTimeExpenseOld.name);
            expect(names).not.toContain(oneTimeIncomeOld.name);
            expect(names).toContain('Mortgage Payment');
        });
    });
};