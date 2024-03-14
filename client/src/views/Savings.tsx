// Note: Have Savings wrapped in Layer in ../App.tsx

import React, { useState } from 'react';

type UserSavingsType = {
  savings: number;
  loans: number;
  debts: number;
  mortgage: number;
};

const Savings: React.FC = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    savings: '',
    loans: '',
    debts: '',
    mortgage: '',
  });

  const [userSavings, setUserSavings] = useState<UserSavingsType>({
    savings: 0,
    loans: 0,
    debts: 0,
    mortgage: 0,
  });

  const handleFormButton = () => {
    const toNumericValues: UserSavingsType = {
      savings: parseFloat(parseFloat(formValues.savings).toFixed(2)) || 0.0,
      loans: parseFloat(parseFloat(formValues.loans).toFixed(2)) || 0,
      debts: parseFloat(parseFloat(formValues.debts).toFixed(2)) || 0,
      mortgage: parseFloat(parseFloat(formValues.mortgage).toFixed(2)) || 0,
    };

    setUserSavings(toNumericValues);
    console.log(userSavings);
  };

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div>
      <div>
        <h1 className="text-5xl pb-2">Savings</h1>
        <p>
          To get started on tracking your savings on Fiscal Friend, please enter
          the information below!
        </p>
        <p className="pb-12">(The information may be changed later.)</p>
      </div>
      <form>
        <div className="pb-8">
          <label
            htmlFor="savings"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Savings
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="savings"
              onChange={handleFormInput}
              className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            ></input>
          </div>
        </div>
        <div className="pb-8">
          <label
            htmlFor="debt"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Loans
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="loans"
              onChange={handleFormInput}
              className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            ></input>
          </div>
        </div>
        <div className="pb-8">
          <label
            htmlFor="loan"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Debts
          </label>
          <div className="relative mt-2 rounded-md shadow-sm py-">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="debts"
              onChange={handleFormInput}
              className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            ></input>
          </div>
        </div>
        <button
          type="button"
          className="flex w-50 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleFormButton}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Savings;
