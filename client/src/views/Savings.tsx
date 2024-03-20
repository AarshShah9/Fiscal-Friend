import React, { useState, useEffect } from 'react';
import axios from 'axios';

type SavingAccountType = {
  chequing: number;
  savings: number;
  resp: number;
};

type LoanAccountType = {
  loc: number;
  mortgage: number;
};

type UserAccountType = {
  savingAccount: SavingAccountType;
  loanAccount: LoanAccountType;
};

type UserType = {
  user: string;
};

const Savings: React.FC = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    chequing: '',
    savings: '',
    resp: '',
    loc: '',
    mortgage: '',
  });

  const [userAccounts, setUserAccounts] = useState<UserAccountType>({
    savingAccount: { chequing: 0, savings: 0, resp: 0 },
    loanAccount: {
      loc: 0,
      mortgage: 0,
    },
  });

  const [user, setUser] = useState<UserType>({
    user: '',
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth/me');
        setUser({
          user: res.data.user,
        });
      } catch (e) {
        console.error('Error getting user: ', e);
      }
    };

    getUser();
  }, []);

  const handleFormButton = async () => {
    const updateSavingAccount: SavingAccountType = {
      chequing: parseFloat(parseFloat(formValues.chequing).toFixed(2)) || 0,
      savings: parseFloat(parseFloat(formValues.savings).toFixed(2)) || 0,
      resp: parseFloat(parseFloat(formValues.resp).toFixed(2)) || 0,
    };

    const updateLoanAccount: LoanAccountType = {
      loc: parseFloat(parseFloat(formValues.loc).toFixed(2)) || 0,
      mortgage: parseFloat(parseFloat(formValues.mortgage).toFixed(2)) || 0,
    };

    setUserAccounts({
      savingAccount: updateSavingAccount,
      loanAccount: updateLoanAccount,
    });

    const postSavings = async () => {
      try {
        const res = await axios.post('http://localhost:4000/savings/create', {
          user: user.user,
          chequing: updateSavingAccount.chequing,
          savings: updateSavingAccount.savings,
          resp: updateSavingAccount.resp,
          loc: updateLoanAccount.loc,
          mortgage: updateLoanAccount.mortgage,
        });
      } catch (e) {
        console.error('Error posting: ', e);
      }
    };

    postSavings();
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
        <h2 className="text-3xl pb-2"> Savings</h2>
        <div className="flex space-x-4">
          <div className="pb-8">
            <label
              htmlFor="chequing"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Chequing
            </label>
            <input
              type="text"
              name="chequing"
              value={formValues.chequing}
              onChange={handleFormInput}
              className="block rounded-md border-gray-300 shadow-sm"
              placeholder="0.00"
            />
          </div>
          <div className="pb-8">
            <label
              htmlFor="savings"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Savings
            </label>
            <input
              type="text"
              name="savings"
              value={formValues.savings}
              onChange={handleFormInput}
              className="block rounded-md border-gray-300 shadow-sm"
              placeholder="0.00"
            />
          </div>
          <div className="pb-8">
            <label
              htmlFor="resp"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              RESP
            </label>
            <input
              type="text"
              name="resp"
              value={formValues.resp}
              onChange={handleFormInput}
              className="block rounded-md border-gray-300 shadow-sm"
              placeholder="0.00"
            />
          </div>
        </div>
        <h2 className="text-3xl pb-2"> Loans</h2>
        <div className="flex space-x-4">
          <div className="pb-8">
            <label
              htmlFor="loc"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Principal Line of Credit
            </label>
            <input
              type="text"
              name="loc"
              value={formValues.loc}
              onChange={handleFormInput}
              className="block rounded-md border-gray-300 shadow-sm"
              placeholder="0.00"
            />
          </div>
          <div className="pb-8">
            <label
              htmlFor="mortgage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Principal Mortgage
            </label>
            <input
              type="text"
              name="mortgage"
              value={formValues.mortgage}
              onChange={handleFormInput}
              className="block rounded-md border-gray-300 shadow-sm"
              placeholder="0.00"
            />
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
