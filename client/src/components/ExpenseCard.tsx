// ExpenseCard.tsx
import { TrashIcon } from '@heroicons/react/24/outline';

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
    const formattedDate = new Date(expense.date);
    return (
        <div className="bg-emerald-300 rounded-lg p-4 shadow-md mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{expense.name}</h2>
            <div className="text-base font-medium"> 
                <p>Amount: {expense.amount}</p>
                <p>Date: {formattedDate.toLocaleDateString()}</p> {/* Convert Date to string */}
                <p>Recurring: {expense.recurring}</p>
                <p>Category: {expense.category}</p>
            </div>
          </div>
          <button onClick={onDelete}>
            <TrashIcon className="h-6 w-6 text-grey-500 hover:text-red-500" />
          </button>
        </div>
      );
};

export default ExpenseCard;
