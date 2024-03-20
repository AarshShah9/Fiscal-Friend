import React, { useState } from 'react';
import PieChart from '../components/PieChart';
import StatsBoxes from '../components/StatsBoxes';
import TransactionsTable from '../components/TransactionsTable';
import Sidebar from '../components/sidebar';

type ExpenseItem = { [key: string]: number };

type IBudget = {
  income: number;
  expenses: {
    total: number;
    itemized: ExpenseItem[];
  };
};

const budget: IBudget = {
  income: 3000,
  expenses: {
    total: 1600,
    itemized: [{ 'rent': 1000 }, { 'food': 400 }, { 'gas': 100}, { 'entertainment': 100 }],
  },
};

export const BudgetContext = React.createContext<IBudget>(budget);

export default function Budget() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarType, setSidebarType] = useState<"expenses" | "incomes">("expenses"); // Track which type of sidebar to open

  const toggleSidebar = (type?: "expenses" | "incomes") => {
    setSidebarType(type || "expenses");
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <BudgetContext.Provider value={budget}>
      <div className="flex flex-row flex-wrap-reverse">
        {/* First Column: Pie Chart */}
        <div className="grow">
          <PieChart />
        </div>
        <div className="flex flex-col justify-start justify-items-center">
          {/* Pass respective type as argument */}
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4" onClick={() => toggleSidebar("expenses")}>
            Manage Expenses
          </button>
          <button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full" onClick={() => toggleSidebar("incomes")}>
            Manage Incomes
          </button>
        </div>
        {/* Pass sidebarType to Sidebar component */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} type={sidebarType} />
      </div>
      <StatsBoxes />
      <div className="min-h-10"></div>
      <TransactionsTable />
    </BudgetContext.Provider>
  );
}
