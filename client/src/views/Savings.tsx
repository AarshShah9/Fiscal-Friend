import React from 'react';
import {useState} from 'react'
import Layout from '../components/layout';

const Savings = () => {
  const [userSavings, setUserSavings] = useState({
    "savings": 0,
    "loans": 0,
    "debts": 0
  });
  
  return (
    <div>
      <Layout content={userSavings}></Layout>
    </div>
  );
};

export default Savings;
