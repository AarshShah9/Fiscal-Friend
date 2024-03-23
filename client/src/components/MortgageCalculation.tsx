import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/constants';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';

type MortgageForm = {
  amount: number;
  apr: number;
  period: number;
  epr: number;
  interestPayment: number;
  firstPayment: number;
  monthlyPayment: number;
  frequency: string;
};

type MortgageProps = {
  amount: number;
  onClose: () => void;
};

const MortgageCalculation: React.FC<MortgageProps> = ({ amount, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { register, handleSubmit } = useForm<MortgageForm>({
    defaultValues: {
      amount: amount,
      apr: 5.0,
      period: 20,
      epr: 0,
      interestPayment: 0,
      firstPayment: 0,
      monthlyPayment: 0,
      frequency: 'Bi-Weekly (every 2 weeks)',
    },
  });

  const onSubmit = async (data: MortgageForm) => {
    const mortgageData = {
      ...data,
      mortgage: {
        amount: data.amount,
        apr: Number(data.apr),
        period: Number(data.period),
      },
    };
    try {
      const res = await axios.post(`${URL}/mortgage/create`, mortgageData);
      onClose();
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div>
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
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Mortgage Calculator
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="amount"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Principal ($)
                              </label>
                              <div className="mt-2">
                                <p className="block w-full rounded-md bg-gray-100 py-1.5 px-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                                  ${amount.toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="apr"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Interest Rate (%)
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  id="apr"
                                  {...register('apr')}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="period"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Period (Years)
                              </label>
                              <div className="mt-2">
                                <input
                                  type="number"
                                  id="period"
                                  {...register('period')}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="frequency"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Payment Frequency
                              </label>
                              <div className="mt-2">
                                <select
                                  id="frequency"
                                  {...register('frequency')}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                >
                                  <option value="Bi-Weekly (every 2 weeks)">
                                    Bi-Weekly (every 2 weeks)
                                  </option>
                                  <option value="Semi-Monthly (24x per year)">
                                    Semi-Monthly (24x per year)
                                  </option>
                                  <option value="Monthly (12x per year)">
                                    Monthly (12x per year)
                                  </option>
                                </select>
                              </div>
                            </div>
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
                      Calculate
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
    </div>
  );
};

export default MortgageCalculation;
