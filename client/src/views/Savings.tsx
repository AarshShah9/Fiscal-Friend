import React from 'react';
import {useState} from 'react'
import Layout from '../components/layout';

const Savings = () => {
  const [userSavings, setUserSavings] = useState({
    "savings": 0,
    "loans": 0,
    "debts": 0
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSavingsChange = (e: { target: { value: any; }; }) => {
    setUserSavings({
        ...userSavings,
        savings: e.target.value,
    });
  };

  const handleLoanChange = (e: { target: { value: any; }; }) => {
    setUserSavings({
        ...userSavings,
        loans: e.target.value,
    });
  };

  const handleDebtChange = (e: { target: { value: any; }; }) => {
    setUserSavings({
        ...userSavings,
        debts: e.target.value,
    });
  };
  
  return (
    <div>
      <div>
        <p>Stinky poo</p>
      </div>
    </div>
  );
};

export default Savings;
