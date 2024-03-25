import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavingsSummary from '../components/SavingsSummary';
import LoansSummary from '../components/LoansSummary';
import { URL } from '../utils/constants';
import MortgageCalculation from '../components/MortgageCalculation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import MortgageInformation, {
  MortgageInfo,
} from '../components/MortgageInformation';

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

// const schema = z.object({
//   chequing: z.number().nonnegative(),
//   savings: z.number().nonnegative(),
//   resp: z.number().nonnegative(),
//   loc: z.number().nonnegative().optional(),
//   mortgage: z.number().nonnegative().optional(),
// });

type Accounts = {
  chequing: number;
  savings: number;
  resp: number;
  loc: number;
  mortgage: number;
};

const Accounts: React.FC = () => {
  const { register, handleSubmit, reset, formState } = useForm<Accounts>();

  const [showMortgageCalculation, setShowMortgageCalculation] = useState(false);
  const [showMortgageInfo, setShowMortgageInfo] = useState(false);
  const [mortgageInfo, setMortgageInfo] = useState<MortgageInfo>();

  const [fetchedData, setFetchedData] = useState<UserAccountType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitData = async (data: any) => {
    try {
      const requestData = {
        chequing: parseFloat(data.chequing).toFixed(2),
        savings: parseFloat(data.savings).toFixed(2),
        resp: data.resp ? parseFloat(data.resp).toFixed(2) : 0,
        loc: data.loc ? parseFloat(data.loc).toFixed(2) : 0,
        mortgage: data.mortgage ? parseFloat(data.mortgage).toFixed(2) : 0,
      };
      setIsLoading(true);
      if (fetchedData) {
        await axios.put(`${URL}/savings/update`, requestData);
      } else {
        await axios.post(`${URL}/savings/create`, requestData);
      }
      // reset();
    } catch (e) {
      window.alert('Error saving data');
      console.error('Error saving data:', e);
    }
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
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [isLoading]);

  const isMortgageCalculatorDisabled =
    fetchedData?.loanAccount.mortgage === 0 ||
    isLoading ||
    fetchedData?.loanAccount.mortgage === undefined ||
    fetchedData?.loanAccount.mortgage === null;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative">
        <div className="absolute top-0 right-0 mr-4 mt-4">
          <button
            className={`bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-4 rounded-full mb-4 ${isMortgageCalculatorDisabled && 'opacity-50 cursor-not-allowed'}`}
            onClick={() => {
              setShowMortgageCalculation(true);
            }}
            disabled={isMortgageCalculatorDisabled}
          >
            Mortgage Calculator
          </button>
          {showMortgageCalculation && (
            <MortgageCalculation
              amount={fetchedData?.loanAccount.mortgage || 0}
              onShow={(data?: MortgageInfo) => {
                setShowMortgageCalculation(false);
                setShowMortgageInfo(true);
                setMortgageInfo(data);
              }}
              onClose={() => {
                setShowMortgageCalculation(false);
              }}
            />
          )}
          {showMortgageInfo && (
            <MortgageInformation
              info={mortgageInfo}
              onClose={() => {
                setShowMortgageInfo(false);
              }}
            />
          )}
        </div>
        <h1 className="text-5xl pb-2">Accounts</h1>
        <p className={'py-4'}>
          To get started on tracking your accounts on Fiscal Friend, please
          enter the information below! Note when you hit submit you must include
          Chequing, Savings, and RESP. The other fields are optional. However,
          they will default to 0 if not included. If you want to use the
          mortgage calculator, you must enter the mortgage amount.
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
              className="block rounded-md border-gray-300 shadow-sm"
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
              className="block rounded-md border-gray-300 shadow-sm"
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
              className="block rounded-md border-gray-300 shadow-sm"
              placeholder="$0.00"
            />
            {formState.errors.resp && (
              <span className="text-red-500">This field is required</span>
            )}
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
              className="block rounded-md border-gray-300 shadow-sm"
              {...register('loc')}
              type="number"
              placeholder="$0.00"
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
              className="block rounded-md border-gray-300 shadow-sm"
              {...register('mortgage')}
              type="number"
              placeholder="$0.00"
            />
          </div>
        </div>
        <button
          type="button"
          className="flex w-50 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit(handleSubmitData)}
        >
          Submit
        </button>
      </form>
      <SavingsSummary
        chequing={fetchedData?.savingAccount.chequing || 0}
        savings={fetchedData?.savingAccount.savings || 0}
        resp={fetchedData?.savingAccount.resp || 0}
      />
      <LoansSummary
        loc={fetchedData?.loanAccount.loc || 0}
        mortgage={fetchedData?.loanAccount.mortgage || 0}
      />
    </div>
  );
};

export default Accounts;
