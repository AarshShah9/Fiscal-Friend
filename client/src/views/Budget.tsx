import React from 'react';
import PieChart from '../components/PieChart';
import StatsBoxes from '../components/StatsBoxes';
import TransactionsTable from '../components/TransactionsTable';

type ExpenseItem = { [key: string]: number };

type Budget = {
  income: number;
  expenses: {
    total: number;
    itemized: ExpenseItem[];
  };
};

const budget: Budget = {
  income: 3000,
  expenses: {
    total: 1600,
    itemized: [{ 'rent': 1000 }, { 'food': 400 }, { 'gas': 100}, { 'entertainment': 100 }],
  },
};

export const BudgetContext = React.createContext<Budget>(budget);

export default function Budget() {
    return (
        <BudgetContext.Provider value={budget}>
            <PieChart />
            <StatsBoxes />
            <div className="min-h-10"></div>
            <TransactionsTable />
        </BudgetContext.Provider>
    );
}
