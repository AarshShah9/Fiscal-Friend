import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavingsSummary from '../components/SavingsSummary';
import LoansSummary from '../components/LoansSummary';
import { URL } from '../utils/constants';
import MortgageCalculation from '../components/MortgageCalculation';
import { useForm } from 'react-hook-form';
import MortgageInformation from '../components/MortgageInformation';

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

interface IMortgage {
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

type Accounts = {
  chequing: number;
  savings: number;
  resp: number;
  loc: number;
  mortgage: number;
};

const Accounts: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<Accounts>();

  const [showMortgageInfo, setShowMortgageInfo] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);  
  const [fetchedData, setFetchedData] = useState<UserAccountType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mortgage, setMortgage] = useState<IMortgage | null>(null);

  const handleSubmitData = async (data: any) => {
    try {
      const requestData = {
        chequing: parseFloat(data.chequing).toFixed(2),
        savings: parseFloat(data.savings).toFixed(2),
        resp: data.resp ? parseFloat(data.resp).toFixed(2) : 0,
        loc: data.loc ? parseFloat(data.loc).toFixed(2) : 0,
      };
      if (fetchedData) {
        await axios.put(`${URL}/savings/update`, requestData)
        .then((res) => setFetchedData(res.data.savings));
      } else {
        await axios.post(`${URL}/savings/create`, requestData)
        .then((res) => setFetchedData(res.data.savings));
      }
      // reset();
    } catch (e) {
      window.alert('Error saving data');
      console.error('Error saving data:', e);
    }
  };

  const fetchData = async () => {
    try {
      await axios.get(`${URL}/savings/get`)
      .then((res) => {
        if (res.data.savings) {
          setFetchedData(res.data.savings);
        } else {
          setFetchedData(null);
        }
    });
   } catch (e) {
      console.error('Error fetching data:', e);
      setFetchedData(null);
    }
    try{
      await axios.get(`${URL}/mortgage/get`)
      .then((res) => {
        setMortgage(res.data.mortgage)
      });
    } catch (e) {
      console.error('Error fetching data:', e);
      setMortgage(null);
    }
    setIsDataFetched(true);
  };

  useEffect(() => {
    if(!isDataFetched){
    fetchData();
    }
  },[isDataFetched]);

  return (
    <div>
      <div className="relative">
        <h1 className="text-5xl pb-2">Accounts</h1>
        <p className={'py-4'}>
          To get started on tracking your accounts on Fiscal Friend, please
          enter the information below! Note when you hit submit you must include
          Chequing, Savings, and RESP. The line of credit field is optional. However,
          it will default to 0 if not included. Mortgages are managed separately.
        </p>
      </div>
      <form>
        <div className="flex space-x-4">
          <div className="pb-8">
            <label
              htmlFor="chequing"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Chequing
            </label>
            <input
              type="number"
              {...register('chequing')}
              className="block rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600"

              placeholder="$0.00"
            />
            {formState.errors.chequing && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="pb-8">
            <label
              htmlFor="savings"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Savings
            </label>
            <input
              type="number"
              {...register('savings')}
              className="block rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600"
              placeholder="$0.00"
            />
            {formState.errors.savings && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="pb-8">
            <label
              htmlFor="resp"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              RESP
            </label>
            <input
              type="number"
              {...register('resp')}
              className="block rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600"
              placeholder="$0.00"
            />
            {formState.errors.resp && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        <h2 className="text-3xl pb-2">Credit Lines</h2>
        <div className="flex space-x-4">
          <div className="pb-4">
            <label
              htmlFor="loc"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Principal Line of Credit
            </label>
            <input
              className="block rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600"
              {...register('loc')}
              type="number"
              placeholder="$0.00"
            />
          </div>
        </div>
        <button
          type="button"
          className="flex w-50 justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerals-600"
          onClick={handleSubmit(handleSubmitData)}
        >
          Submit
        </button>
      </form>
      <div className="pt-8">
      <h2 className="text-3xl pb-2">Mortgage</h2>
            <label
              htmlFor="mortgage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Manage Your Mortgage
            </label>
            <button
            type='button'
            className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-md mb-4`}
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            {!mortgage ? 'Add a Mortgage' : 'Edit Mortgage'}
          </button>
            <MortgageCalculation
              mortgage={mortgage}
              setMortgage={setMortgage}
              onClose={() => {
                setIsModalOpen(false);
              }}
              isOpen={isModalOpen}
              setShowMortgageInfo={setShowMortgageInfo}
            />
            {mortgage && (
          <div>
            <button
            type='button'
            className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-md mb-4`}
            onClick={() => {
              setShowMortgageInfo(true);
            }}
          >
            View Mortgage Information
          </button>
          <MortgageInformation
            isOpen={showMortgageInfo}
            mortgage={mortgage}
            onClose={() => {
              setShowMortgageInfo(false);
            }}
          />
          </div>
          )}
          </div> 
      <SavingsSummary
        chequing={fetchedData?.savingAccount.chequing || 0}
        savings={fetchedData?.savingAccount.savings || 0}
        resp={fetchedData?.savingAccount.resp || 0}
      />
      <LoansSummary
        loc={fetchedData?.loanAccount.loc || 0}
        mortgage={mortgage?.mortgage.amount || 0}
      />
    </div>
  );
};

export default Accounts;
