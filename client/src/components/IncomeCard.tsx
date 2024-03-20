// IncomeCard.tsx
import { TrashIcon } from '@heroicons/react/24/outline';

interface IIncome {
    _id: string;
    user: string;
    name: string;
    amount: number;
    date: Date;
    recurring: string;
  };

interface IncomeCardProps {
  income: IIncome;
  onDelete: () => void;
}

const IncomeCard: React.FC<IncomeCardProps> = ({ income, onDelete }) => {
    const formattedDate = new Date(income.date);
  return (
    <div className="bg-emerald-300 rounded-lg p-4 shadow-md mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{income.name}</h2>
        <div className="text-base font-medium"> 
            <p>Amount: ${income.amount}</p>
            <p>Date: {formattedDate.toLocaleDateString()}</p> {/* Convert Date to string */}
            <p>Recurring: {income.recurring}</p>
        </div>
      </div>
      <button onClick={onDelete}>
      <TrashIcon className="h-6 w-6 text-grey-500 hover:text-red-500" />
      </button>
    </div>
  );
};

export default IncomeCard;
