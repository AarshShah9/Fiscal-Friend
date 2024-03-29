import { IBudget } from "../views/Budget";

interface StatsBoxesProps {
    budget: IBudget;
};

export default function StatsBoxes({ budget }: StatsBoxesProps) {

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
