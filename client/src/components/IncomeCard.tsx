// IncomeCard.tsx
import { TrashIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

interface IIncome {
  _id: string;
  user: string;
  name: string;
  amount: number;
  date: Date;
  recurring: string;
}

interface IncomeCardProps {
  income: IIncome;
  onDelete: () => void;
}

const IncomeCard: React.FC<IncomeCardProps> = ({ income, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formattedDate = new Date(income.date);
  return (
    <div className="bg-emerald-300 rounded-lg p-4 shadow-md mb-4 overflow-hidden">
      <div className="flex items-start">
        <button
          onClick={toggleDetails}
          className="mr-4 mt-1 focus:outline-none"
        >
          <ChevronDownIcon
            className={`h-6 w-6 text-grey-500 hover:text-blue-500 transform transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className={`flex-grow transition-all duration-300 overflow-hidden hover:overflow-auto h-auto`}
        >
          <div className="flex flex-row justify-left items-center flex-wrap">
            <h2 className="text-lg font-semibold pr-4">{income.name}</h2>
            <h2 className="text-lg font-semibold text-gray-700">
              ${income.amount}
            </h2>
          </div>
          <div className="text-base font-medium ">
            {showDetails && (
              <div>
                <p>Date: {formattedDate.toLocaleDateString()}</p>
                <p>Recurring: {income.recurring}</p>
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

export default IncomeCard;
