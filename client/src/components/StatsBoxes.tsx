import { useContext } from "react";
import { BudgetContext } from '../views/Budget';

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

export default function StatsBoxes() {

  const budget = useContext(BudgetContext) as IBudget;

  var expenseNames = [] as string[];
  var expenseValues = [] as number[];

  Object.values(budget.expenses.itemized).forEach((expenseItem) => {
    // Iterate over each key-value pair in the expense object
    Object.entries(expenseItem).forEach(([itemName, itemValue]) => {
      expenseNames.push(itemName);
      expenseValues.push(itemValue);
    });
  });

  var stats = [
    { name: 'Income', stat: '$' + budget.income },
    { name: 'Spent', stat: '$' + budget.expenses.total },
    { name: 'Remaining', stat: '$' + (Number(budget.income) - Number(budget.expenses.total))},
  ];

  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
