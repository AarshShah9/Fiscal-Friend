import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavingsSummary from '../components/SavingsSummary';
import LoansSummary from '../components/LoansSummary';
import { URL } from '../utils/constants';
import MortgageCalculation from '../components/MortgageCalculation';

const testSavings: SavingAccountType = {
  chequing: 100,
  savings: 2000,
  resp: 2500,
};

const testLoans: LoanAccountType = {
  loc: 3000,
  mortgage: 20000,
};

export const SavingsContext =
  React.createContext<SavingAccountType>(testSavings);

export const LoansContext = React.createContext<LoanAccountType>(testLoans);

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

const Savings: React.FC = () => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    chequing: '',
    savings: '',
    resp: '',
    loc: '',
    mortgage: '',
  });

  const [isContinueClick, setIsContinueClick] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showMortgageCalculation, setShowMortgageCalculation] = useState(false);
  const [fetchedData, setFetchedData] = useState<UserAccountType | null>(null);

  const handleFormButton = async () => {
    const chequingElement = document.getElementById('chequingValue');
    const savingElement = document.getElementById('savingValue');

    if (chequingElement === null || savingElement === null) {
      return;
    } else {
      let notFilled = false;
      if (formValues.chequing === '') {
        chequingElement.classList.replace('invisible', 'visible');
        notFilled = true;
      } else {
        chequingElement.classList.replace('visible', 'invisible');
      }

      if (formValues.savings === '') {
        savingElement.classList.replace('invisible', 'visible');
        notFilled = true;
      } else {
        savingElement.classList.replace('visible', 'invisible');
      }

      if (notFilled) return;
    }

    const updateSavingAccount: SavingAccountType = {
      chequing: parseFloat(parseFloat(formValues.chequing).toFixed(2)) || 0,
      savings: parseFloat(parseFloat(formValues.savings).toFixed(2)) || 0,
      resp: parseFloat(parseFloat(formValues.resp).toFixed(2)) || 0,
    };

    const updateLoanAccount: LoanAccountType = {
      loc: parseFloat(parseFloat(formValues.loc).toFixed(2)) || 0,
      mortgage: parseFloat(parseFloat(formValues.mortgage).toFixed(2)) || 0,
    };

    const saveSavingsData = async () => {
      try {
        const requestData = {
          chequing: updateSavingAccount.chequing,
          savings: updateSavingAccount.savings,
          resp: updateSavingAccount.resp,
          loc: updateLoanAccount.loc,
          mortgage: updateLoanAccount.mortgage,
        };

        if (fetchedData) {
          await axios.put(`${URL}/savings/update`, requestData);
        } else {
          await axios.post(`${URL}/savings/create`, requestData);
        }
      } catch (e) {
        console.error('Error saving data:', e);
      }
    };

    await saveSavingsData();

    fetchData();
    setIsContinueClick(true);
    setIsSubmit((current) => !current);
  };

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${URL}/savings/get`);
      if (res.data.savings && res.data.savings.length > 0) {
        setFetchedData(res.data.savings[0]);
      } else {
        setFetchedData(null);
      }
    } catch (e) {
      console.error('Error fetching data:', e);
      setFetchedData(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isMortgageCalculatorEnabled =
    isContinueClick && fetchedData && fetchedData.loanAccount.mortgage > 0;

  const handleMortgageCalculatorButton = () => {
    if (isMortgageCalculatorEnabled) {
      setShowMortgageCalculation(true);
    }
  };

  const handleCloseMortgageCalculation = () => {
    setShowMortgageCalculation(false);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 right-0 mr-4 mt-4">
          <button
            className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4 ${!isMortgageCalculatorEnabled && 'opacity-50 cursor-not-allowed'}`}
            disabled={!isMortgageCalculatorEnabled}
            onClick={() => {
              handleMortgageCalculatorButton();
            }}
          >
            Mortgage Calculator
          </button>
          {showMortgageCalculation && (
            <MortgageCalculation
              amount={fetchedData?.loanAccount.mortgage || 0}
              onClose={handleCloseMortgageCalculation}
            />
          )}
        </div>
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
            <p
              id="chequingValue"
              className="invisible text-red-500 text-xs italic"
            >
              Please fill out this field.
            </p>
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
            <p
              id="savingValue"
              className="invisible text-red-500 text-xs italic"
            >
              Please fill out this field.
            </p>
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

      <SavingsContext.Provider value={testSavings}>
        <SavingsSummary />
      </SavingsContext.Provider>
      <LoansContext.Provider value={testLoans}>
        <LoansSummary />
      </LoansContext.Provider>
    </div>
  );
};

export default Savings;
