import React from 'react';
import { useState } from 'react';
import Layout from '../components/layout';

const Savings = () => {
  const [userSavings, setUserSavings] = useState({
    savings: 0,
    loans: 0,
    debts: 0,
    mortgage: 0,
  });
  console.log(userSavings);

  const handleSavingsChange = (e: { target: { value: any } }) => {
    setUserSavings({
      ...userSavings,
      savings: e.target.value,
    });
  };

  const handleLoanChange = (e: { target: { value: any } }) => {
    setUserSavings({
      ...userSavings,
      loans: e.target.value,
    });
  };

  const handleDebtChange = (e: { target: { value: any } }) => {
    setUserSavings({
      ...userSavings,
      debts: e.target.value,
    });
  };

  const handleMortgage = (e: { target: { value: any } }) => {
    setUserSavings({
      ...userSavings,
      savings: e.target.value,
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
              onChange={handleSavingsChange}
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
              name="debt"
              onChange={handleDebtChange}
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
              name="loan"
              onChange={handleLoanChange}
              className="block w-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            ></input>
          </div>
        </div>
        <button
          type="submit"
          className="flex w-50 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Savings;
