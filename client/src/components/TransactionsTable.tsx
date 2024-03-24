import { Fragment, useEffect, useState } from 'react';
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid';
import { URL } from '../utils/constants';
import axios from 'axios';
import { set } from 'react-hook-form';

interface TransactionTableProps {
  refreshRequired: boolean;
  setRefreshRequired: React.Dispatch<React.SetStateAction<boolean>>;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ITransaction {
  id: string;
  name: string;
  date: Date | undefined;
  amount: number;
  category: string | null;
  icon: 'in' | 'out';
  recurring: string;
}

interface IFormattedTransactions {
  date: string;
  transactions: ITransaction[];
}

export default function TransactionsTable({
  refreshRequired,
  setRefreshRequired,
}: TransactionTableProps) {
  const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched
  const [days, setDays] = useState<IFormattedTransactions[]>([]);

  useEffect(() => {
    if (refreshRequired || !dataFetched) {
      axios
        .post(`${URL}/transaction/get`)
        .then((res) => {
          setDays(res.data.formattedTransactions);
          setDataFetched(true);
          setRefreshRequired(false);
        })
        .catch((error) => console.error('Error fetching transactions:', error));
    }
  }, [dataFetched, refreshRequired, setRefreshRequired]);

  const currentDate = new Date();

  return (
    <div>
      <h2 className="max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
        Recent activity
      </h2>
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {days.length > 0 &&
                  days.map((day) => (
                    <Fragment key={day.date}>
                      <tr className="text-sm leading-6 text-gray-900">
                        <th
                          scope="colgroup"
                          colSpan={3}
                          className="relative isolate py-2 font-semibold"
                        >
                          <div>
                            {day.date === currentDate.toISOString().slice(0, 10)
                              ? 'Today'
                              : day.date}
                          </div>
                          <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                          <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                        </th>
                      </tr>
                      {day.transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="relative py-5 pr-6">
                            <div className="flex gap-x-6">
                              {transaction.icon === 'in' ? (
                                <ArrowUpCircleIcon
                                  className="hidden h-6 w-5 flex-none text-green-400 sm:block"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArrowDownCircleIcon
                                  className="hidden h-6 w-5 flex-none text-red-400 sm:block"
                                  aria-hidden="true"
                                />
                              )}
                              <div className="flex-auto">
                                <div className="flex items-start gap-x-3">
                                  <div className="text-sm font-medium leading-6 text-gray-900">
                                    {transaction.amount}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                            <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                          </td>
                          <td className="hidden py-5 pr-6 sm:table-cell">
                            <div className="text-sm leading-6 text-gray-900">
                              {transaction.name}
                            </div>
                            <div className="mt-1 text-xs leading-5 text-gray-500">
                              {transaction.category}
                            </div>
                          </td>
                          <td className="py-5 text-right">
                            <div className="flex justify-end">
                              <div className="text-sm font-medium leading-6 text-emerald-600">
                                {transaction.recurring === 'One-time'
                                  ? 'Does not recur'
                                  : 'Recurs ' + transaction.recurring}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
