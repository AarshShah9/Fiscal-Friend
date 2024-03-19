import { CreditCard, Expense, Income, Mortgage } from '../models';
import { Request, Response } from 'express';

interface IBudget {
    income: Number;
    expenses: {
        total: Number;
        itemized: {
            food: Number;
            housing: Number;
            transportation: Number;
            insurance: Number;
            wellness: Number;
            entertainment: Number;
            other: Number;
            mortgage?: Number;
            creditCard?: Number;
        };
    };
    recommendedBudget: {
        food: Number;
        housing: Number;
        transportation: Number;
        insurance: Number;
        wellness: Number;
        entertainment: Number;
        other: Number;
        mortgage?: Number;
        creditCard?: Number;
    };
};


