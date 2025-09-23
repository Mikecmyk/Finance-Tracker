// src/FinancialSummary.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

const FinancialSummary = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'transactions')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let income = 0;
      let expenses = 0;

      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else if (transaction.type === 'expense') {
          expenses += transaction.amount;
        }
      });

      setTotalIncome(income);
      setTotalExpenses(expenses);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentBalance = totalIncome - totalExpenses;

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading financial summary...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Total Income Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h3 className="summary-title">Total Income</h3>
        <p className="income-amount">${totalIncome.toFixed(2)}</p>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h3 className="summary-title">Total Expenses</h3>
        <p className="expense-amount">${totalExpenses.toFixed(2)}</p>
      </div>

      {/* Current Balance Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
        <h3 className="summary-title">Current Balance</h3>
        <p className="balance-amount">${currentBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FinancialSummary;