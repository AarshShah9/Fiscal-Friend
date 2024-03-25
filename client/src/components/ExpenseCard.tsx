import { TrashIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface IExpense {
  _id: string;
  user: string;
  name: string;
  amount: number;
  date: Date;
  recurring: string;
  category: string;
}

interface ExpenseCardProps {
  expense: IExpense;
  onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };


  return (
    <div className="bg-emerald-500 rounded-lg p-4 shadow-md mb-4 overflow-hidden text-white">
      <div className="flex items-start">
        <button
          onClick={toggleDetails}
          className="mr-4 mt-1 focus:outline-none"
        >
          <ChevronDownIcon
            className={`h-6 w-6 text-white hover:text-gray-500 transform transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`flex-grow transition-all duration-300 overflow-hidden hover:overflow-auto h-auto`}
        >
          <div className="flex flex-row justify-left items-center flex-wrap">
            <h2 className="text-lg font-semibold pr-4">{expense.name}</h2>
            <h2 className="text-lg font-semibold text-gray-700">
              ${expense.amount}
            </h2>
          </div>
          <div className="text-base font-medium ">
            {showDetails && (
              <div>
                {expense.date && (<p>Date: {new Date(expense.date).toLocaleDateString()}</p>)}
                <p>Recurring: {expense.recurring}</p>
                <p>Category: {expense.category}</p>
              </div>
            )}
          </div>
        </div>
        <button onClick={onDelete} className="ml-auto focus:outline-none">
          <TrashIcon className="h-6 w-6 text-grey-500 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
