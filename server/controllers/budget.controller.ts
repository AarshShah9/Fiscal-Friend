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
            savings: Number;
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
        savings: Number;
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
                   amount = parseFloat(((incomes[i]?.amount || 0) * 4).toFixed(2));
                   break;
               case 'Bi-Weekly':
                   amount = parseFloat(((incomes[i]?.amount || 0) * 2).toFixed(2));
                   break;
               case 'Monthly':
                   amount = parseFloat((incomes[i]?.amount || 0).toFixed(2));
                   break;
               case 'Quarterly':
                   amount = parseFloat(((incomes[i]?.amount || 0) / 3).toFixed(2));
                   break;
               case 'Annually':
                   amount = parseFloat(((incomes[i]?.amount || 0) / 12).toFixed(2));
                   break;
               default:
                   break;
           }
           totalIncome += amount || 0;
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
           savings: 0,
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
                   amount = parseFloat(((expenses[i]?.amount || 0) * 4).toFixed(2));
                   break;
               case 'Bi-Weekly':
                   amount = parseFloat(((expenses[i]?.amount || 0) * 2).toFixed(2));
                   break;
               case 'Monthly':
                   amount = parseFloat((expenses[i]?.amount || 0).toFixed(2));
                   break;
               case 'Quarterly':
                   amount = parseFloat(((expenses[i]?.amount || 0) / 3).toFixed(2));
                   break;
               case 'Annually':
                   amount = parseFloat(((expenses[i]?.amount || 0) / 12).toFixed(2));
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
                case 'Savings':
                    itemizedExpenses.savings += amount;
                    break;
                case 'Other':
                    itemizedExpenses.other += amount;
                    break;
            }
        }

        // Calculate total recommended budget for the month
        let flexibleIncome = totalIncome;
        if (itemizedExpenses.rent > 0) {
            flexibleIncome -= itemizedExpenses.rent;
        }
        let recommendedBudget;
        if (flexibleIncome <= 0) {
            recommendedBudget = {
                food: 0,
                utilities: 0,
                transportation: 0,
                insurance: 0,
                wellness: 0,
                entertainment: 0,
                other: 0,
                savings: 0,
            };
        } else {
            recommendedBudget = {
                food: parseFloat((flexibleIncome * 0.15).toFixed(2)),
                utilities: parseFloat((flexibleIncome * 0.15).toFixed(2)),
                transportation: parseFloat((flexibleIncome * 0.10).toFixed(2)),
                insurance: parseFloat((flexibleIncome * 0.05).toFixed(2)),
                wellness: parseFloat((flexibleIncome * 0.05).toFixed(2)),
                entertainment: parseFloat((flexibleIncome * 0.06).toFixed(2)),
                other: parseFloat((flexibleIncome * 0.06).toFixed(2)),
                savings: parseFloat((flexibleIncome * 0.4).toFixed(2)),
            };
        }

        const budget: IBudget = {
            income: totalIncome,
            expenses: {
                total: totalExpenses,
                itemized: itemizedExpenses,
            },
            recommendedBudget: recommendedBudget,
        };

        return res.status(201).json({ success: true, budget: budget });
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
};
