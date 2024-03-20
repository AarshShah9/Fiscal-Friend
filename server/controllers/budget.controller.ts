import { CreditCard, Expense, Income, Mortgage, User } from '../models';
import { Request, Response } from 'express';

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

export const getBudget = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.body.user);
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    try {
        // Income array
        const incomes = await Income.find({ user: req.body.user });

        // Expenses array
        const expenses = await Expense.find({ user: req.body.user });

        // Credit Cards array
        const creditCards = [];
        for (let i = 0; i < user.CreditCards?.length; i++) {
            creditCards.push(await CreditCard.findById(user.CreditCards[i]));
        }

        // Mortgages array
        const mortgages = [];
        for (let i = 0; i < user.Mortgages?.length; i++) {
            mortgages.push(await Mortgage.findById(user.Mortgages[i]));
        }

        // Calculate total income for the month
        let totalIncome = 0;
        for (let i = 0; i < incomes.length; i++) {
            let amount = 0;
            switch (incomes[i]?.recurring) {
                case 'One-time':
                    if (incomes[i]?.date?.getMonth() === new Date().getMonth() && incomes[i]?.date?.getFullYear() === new Date().getFullYear()) {
                        amount = incomes[i]?.amount || 0;
                    } else {
                        continue;
                    }
                    break;
                case 'Weekly':
                    amount = incomes[i]?.amount || 0 * 4;
                    break;
                case 'Bi-Weekly':
                    amount = incomes[i]?.amount || 0 * 2;
                    break;
                case 'Monthly':
                    amount = incomes[i]?.amount || 0;
                    break;
                case 'Quarterly':
                    amount = incomes[i]?.amount || 0 / 4;
                    break;
                case 'Annually':
                    amount = incomes[i]?.amount || 0 / 12;
                    break;
                default:
                    break;
            }
            totalIncome += incomes[i]?.amount || 0;
        }

        // Calculate total expenses for the month grouping by category
        let totalExpenses = 0;
        const itemizedExpenses = {
            food: 0,
            utilities: 0,
            rent: 0,
            transportation: 0,
            insurance: 0,
            wellness: 0,
            entertainment: 0,
            other: 0,
        };

        for (let i = 0; i < expenses.length; i++) {
            let amount = 0;
            switch (expenses[i]?.recurring) {
                case 'One-time':
                    if (expenses[i]?.date?.getMonth() === new Date().getMonth() && expenses[i]?.date?.getFullYear() === new Date().getFullYear()) {
                        amount = expenses[i]?.amount || 0;
                    } else {
                        continue;
                    }
                    break;
                case 'Weekly':
                    amount = expenses[i]?.amount || 0 * 4;
                    break;
                case 'Bi-Weekly':
                    amount = expenses[i]?.amount || 0 * 2;
                    break;
                case 'Monthly':
                    amount = expenses[i]?.amount || 0;
                    break;
                case 'Quarterly':
                    amount = expenses[i]?.amount || 0 / 4;
                    break;
                case 'Annually':
                    amount = expenses[i]?.amount || 0 / 12;
                    break;
                default:
                    break;
            }
            totalExpenses += amount;
            switch (expenses[i]?.category) {
                case 'Food':
                    itemizedExpenses.food += amount;
                    break;
                case 'Utilities':
                    itemizedExpenses.utilities += amount;
                    break;
                case 'Rent':
                    itemizedExpenses.rent += amount;
                    break;
                case 'Transportation':
                    itemizedExpenses.transportation += amount;
                    break;
                case 'Insurance':
                    itemizedExpenses.insurance += amount;
                    break;
                case 'Wellness':
                    itemizedExpenses.wellness += amount;
                    break;
                case 'Entertainment':
                    itemizedExpenses.entertainment += amount;
                    break;
                default:
                    itemizedExpenses.other += amount;
                    break;
            }
        }

        // Calculate total credit card payments for the month
        let totalCreditCardPayments = 0;
        for (let i = 0; i < creditCards.length; i++) {
            let amount = (creditCards[i]?.minimumPaymentPercentage || 0) * (creditCards[i]?.currentBalance || 0);
            totalCreditCardPayments += amount;
        }

        // Calculate total mortgage payments for the month
        let totalMortgagePayments = 0;
        for (let i = 0; i < mortgages.length; i++) {
            let amount = (mortgages[i]?.monthlyPayment || 0);
            totalMortgagePayments += amount;
        }


        // Calculate total recommended budget for the month
        let flexibleIncome = totalIncome;
        if(mortgages.length > 0) {
            flexibleIncome -= totalMortgagePayments;
        }
        if(creditCards.length > 0) {
            flexibleIncome -= totalCreditCardPayments;
        }
        if(itemizedExpenses.rent > 0) {
            flexibleIncome -= itemizedExpenses.rent;
        }
        const recommendedBudget = {
            food: flexibleIncome * 0.1,
            utilities: flexibleIncome * 0.15,
            transportation: flexibleIncome * 0.15,
            insurance: flexibleIncome * 0.05,
            wellness: flexibleIncome * 0.05,
            entertainment: flexibleIncome * 0.2,
            other: flexibleIncome * 0.1,
            savings: flexibleIncome * 0.2,
        };
        
        const budget: IBudget = {
            income: totalIncome,
            expenses: {
                total: totalExpenses,
                itemized: itemizedExpenses,
            },
            recommendedBudget: recommendedBudget,
        };
    
        return res.status(200).json({ success: true, budget: budget });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }    
};


