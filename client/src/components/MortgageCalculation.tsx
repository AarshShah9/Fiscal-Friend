import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/constants';

type MortgageRequiredType = {
  amount: number;
  apr: number;
  period: number;
};

type PaymentsType = {
  principal: number;
  interest: number;
  repayment: number;
  total: number;
};

type MortgageType = {
  mortgage: MortgageRequiredType;
  payments: PaymentsType;
  frequency: string;
};

const MortgageCalculation: React.FC = () => {
  const [mortgageRequired, setMortgageRequired] =
    useState<MortgageRequiredType>({
      amount: 0,
      apr: 0,
      period: 0,
    });

  const handleMortgageRequired = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMortgageRequired({
      ...mortgageRequired,
      [name]: parseFloat(value),
    });
  };

  return <div></div>;
};

export default MortgageCalculation;
