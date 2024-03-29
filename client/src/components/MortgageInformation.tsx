import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/constants';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';

interface IMortgage{
  user: string;
  mortgage: {
    amount: number;
    apr: number;
    period: number;
  };
  payments: {
    epr: number;
    interestPayment: number;
    firstPayment: number;
    payment: number;
  };
  frequency:
    | 'Bi-Weekly (every 2 weeks)'
    | 'Semi-Monthly (24x per year)'
    | 'Monthly (12x per year)';
}


type MortgageInfoProps = {
  mortgage: IMortgage;
  onClose: () => void;
  isOpen: boolean;
};

const MortgageInformation: React.FC<MortgageInfoProps> = ({
  mortgage,
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
                          Mortgage Information
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="frequency"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Payment Frequency
                            </label>
                            <div className="mt-2">
                              <p className="block w-full rounded-md bg-gray-100 py-1.5 px-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                                {mortgage.frequency}
                              </p>
                            </div>
                          </div>
                          <div className="sm:col-span-3 pt-2">
                            <label
                              htmlFor="frequency"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Overall Info
                            </label>
                            <div className="mt-2">
                              <p className="block w-full rounded-md bg-gray-100 py-1.5 px-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                                Amount:{' $'}
                                {mortgage.mortgage.amount.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                                <br />
                                Annual Percentage Rate (APR):{' '}
                                {mortgage.mortgage.apr}
                                {'%'}
                                <br />
                                Period: {mortgage.mortgage.period} Years
                              </p>
                            </div>
                          </div>
                          <div className="sm:col-span-3 pt-2">
                            <label
                              htmlFor="frequency"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Payment Info
                            </label>
                            <div className="mt-2">
                              <p className="block w-full rounded-md bg-gray-100 py-1.5 px-2 text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                                Payment:{' $'}
                                {mortgage.payments.payment.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                                <br />
                                Effective Percentage Rate:{' '}
                                {mortgage.payments.epr}
                                {'%'}
                                <br />
                                First Payment:{' $'}
                                {mortgage.payments.firstPayment.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                                <br />
                                Interest Payment:{' $'}
                                {mortgage.payments.interestPayment.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => handleClose()}
                    >
                      Close
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

export default MortgageInformation;
