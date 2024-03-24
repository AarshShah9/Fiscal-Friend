import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { URL } from '../utils/constants';
import axios from 'axios';
import ExpenseCard from './ExpenseCard';
import IncomeCard from './IncomeCard';

import CreateTransactionModal from './CreateTransactionModal';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  type: 'expenses' | 'incomes' | undefined;
  setRefreshRequired: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IIncome {
  _id: string;
  user: string;
  name: string;
  amount: number;
  date: Date;
  recurring: string;
}

interface IExpense {
  _id: string;
  user: string;
  name: string;
  amount: number;
  date: Date;
  recurring: string;
  category: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  type,
  setRefreshRequired,
}) => {
  const title = type === 'expenses' ? 'Manage Expenses' : 'Manage Incomes';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setCreateType] = useState<
    'expenses' | 'incomes' | undefined
  >(undefined);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [incomes, setIncomes] = useState<IIncome[]>([]);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched

  useEffect(() => {
    if (isOpen && !dataFetched) {
      axios
        .post(`${URL}/expense/get`)
        .then((res) => setExpenses(res.data.expenses)) // Extract the data from the response object
        .catch((error) => console.error('Error fetching expenses:', error));

      axios
        .post(`${URL}/income/get`)
        .then((res) => setIncomes(res.data.incomes))
        .catch((error) => console.error('Error fetching incomes:', error));

      setDataFetched(true); // Update the flag
    }
  }, [isOpen, dataFetched]); // Fetch data whenever isOpen changes and dataFetched is false

  useEffect(() => {
    setRefreshRequired(true);
  }, [expenses, incomes]);

  const openModal = (type: 'expenses' | 'incomes' | undefined) => {
    setCreateType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteExpense = (id: string) => {
    axios
      .post(`${URL}/expense/remove`, { expense: id })
      .then((res) => {
        console.log('Expense deleted:', res.data);
        setExpenses(expenses.filter((expense) => expense._id !== id));
      })
      .catch((error) => console.error('Error removing expense:', error));
  };

  const deleteIncome = (id: string) => {
    axios
      .post(`${URL}/income/remove`, { income: id })
      .then((res) => {
        console.log('Income removed:', res.data);
        setIncomes(incomes.filter((income) => income._id !== id));
      })
      .catch((error) => console.error('Error removing income:', error));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleSidebar}>
        <CreateTransactionModal // Render the CreateTransactionModal component
          isOpen={isModalOpen}
          onClose={closeModal}
          type={transactionType}
          incomes={incomes}
          expenses={expenses}
          setRefreshRequired={setRefreshRequired}
        />
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={toggleSidebar}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 flex flex-row items-center justify-between">
                        <span>{title}</span>
                        <button
                          type="button"
                          className="relative inline-flex items-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                          onClick={() => openModal(type)}
                        >
                          Create new{' '}
                          {type === 'expenses' ? 'expense' : 'income'}
                        </button>
                      </Dialog.Title>
                    </div>
                    <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
                      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"></div>
                    </div>
                    <div className="ml-2 mt-2 mr-2">
                      {/* Display expenses */}
                      {type === 'expenses' && (
                        <div>
                          {expenses.map((expense) => (
                            <ExpenseCard
                              key={expense._id}
                              expense={expense}
                              onDelete={() => deleteExpense(expense._id)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Display incomes */}
                      {type === 'incomes' && (
                        <div>
                          {incomes.map((income) => (
                            <IncomeCard
                              key={income._id}
                              income={income}
                              onDelete={() => deleteIncome(income._id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Sidebar;
