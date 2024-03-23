import React, { useState, useEffect } from 'react';
import PieChart from '../components/PieChart';
import StatsBoxes from '../components/StatsBoxes';
import TransactionsTable from '../components/TransactionsTable';
import Sidebar from '../components/sidebar';
import axios from 'axios';
import { URL } from '../utils/constants';
import ColumnChart from '../components/ColumnChart';
import BarChart from '../components/BarChart';

export interface IBudget {
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
}

export default function Budget() {
  const [budget, setBudget] = useState<IBudget>({
    income: 0,
    expenses: {
      total: 0,
      itemized: {
        food: 0,
        housing: 0,
        transportation: 0,
        insurance: 0,
        wellness: 0,
        entertainment: 0,
        other: 0,
      },
    },
    recommendedBudget: {
      food: 0,
      housing: 0,
      transportation: 0,
      insurance: 0,
      wellness: 0,
      entertainment: 0,
      other: 0,
    },
  } as IBudget);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarType, setSidebarType] = useState<
    'expenses' | 'incomes' | undefined
  >('expenses'); // Track which type of sidebar to open
  const [refresh, setRefresh] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched

  const toggleSidebar = (type?: 'expenses' | 'incomes' | undefined) => {
    setSidebarType(type);
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (refresh || !dataFetched) {
      axios
        .post(`${URL}/budget/budget`)
        .then((res) => {
          setBudget(res.data.budget);
          setRefresh(false);
        })
        .catch((error) => console.error('Error fetching budget:', error));
    }
  }, [dataFetched, refresh, setRefresh]);

  return (
    <>
      <div className="flex flex-col min-h-screen justify-around">
        <div className="h-3/5 grow">
          <PieChart budget={budget} />
        </div>

        <div className="flex flex-row grow">
          <ColumnChart budget={budget} />
          <BarChart budget={budget} />
        </div>

        <div className="flex flex-col justify-start justify-items-center absolute right-4 top-20 px-4 py-4">
          {/* Pass respective type as argument */}
          <button
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4"
            onClick={() => toggleSidebar('expenses')}
          >
            Manage Expenses
          </button>
          <button
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => toggleSidebar('incomes')}
          >
            Manage Incomes
          </button>
        </div>
        {/* Pass sidebarType to Sidebar component */}
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          type={sidebarType}
          setRefreshRequired={setRefresh}
        />
      </div>
      <StatsBoxes budget={budget} />
      <div className="min-h-10"></div>
      <TransactionsTable
        refreshRequired={refresh}
        setRefreshRequired={setRefresh}
      />
    </>
  );
}
