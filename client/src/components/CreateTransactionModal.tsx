import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { URL } from '../utils/constants';


interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "expenses" | "incomes" | undefined;
  incomes: any[];
  expenses: any[];
}

type incomeForm = {
  name: string;
  amount: number;
  date: Date;
  recurring: string;
};

type expenseForm = {
  name: string;
  amount: number;
  date: Date;
  recurring: string;
  category: string;
};

const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({ isOpen, onClose, type, incomes, expenses }) => {
  const { register, handleSubmit, watch } = useForm<expenseForm | incomeForm>({
    defaultValues: {
      name: "New",
      amount: 0,
      date: new Date(),
      recurring: 'One-time',
      category: 'Other',
    },
  });

  const recurring = watch('recurring');

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent propagation of click event to parent elements
    onClose(); // Close the modal
    };

    const onSubmit = (data: incomeForm | expenseForm) => {
      if (type === 'expenses') {
        const expenseFormData: expenseForm = data as expenseForm;
        axios.post(`${URL}/expense/create`, expenseFormData).then((res) => {
          expenses.push(res.data.expense);
          onClose();
        });
      } else {
        const incomeFormData: incomeForm = data as incomeForm;
        axios.post(`${URL}/income/create`, incomeFormData).then((res) => {
          incomes.push(res.data.income);
          onClose();
        });
      }
    };
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {type === 'expenses' ? 'Create New Expense' : 'Create New Income'}
                      </Dialog.Title>
                      <div className="mt-2">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                id="name"
                                {...register('name')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="Amount"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Amount $
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                id="amount"
                                {...register('amount')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="Recurring"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Recurring?
                            </label>
                            <div className="mt-2">
                            <select
                                id="recurring"
                                {...register('recurring')}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                              >
                                <option value="One-time">One-time</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Bi-Weekly">Bi-Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>
                          </div>
                          {recurring === 'One-time' && (
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="Date"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Date
                              </label>
                              <div className="mt-2">
                                <input
                                  id="date"
                                  type="date"
                                  autoComplete="date"
                                  {...register('date')}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          )}
                            {type === 'expenses' && (
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="Category"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Category
                                </label>
                                <div className="mt-2">
                                  <select
                                    id="category"
                                    {...register('category')}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                    >
                                    <option value="Food">Food</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Insurance">Insurance</option>
                                    <option value="Wellness">Wellness</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Other">Other</option>
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 sm:ml-3 sm:w-auto"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={(e) => handleClose(e)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default CreateTransactionModal;
