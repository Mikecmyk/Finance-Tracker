// src/CategoryChart.jsx
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { db, auth } from './firebase';
import { collection, query, onSnapshot, where } from 'firebase/firestore';

// Register the necessary components from Chart.js for a pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    // We only want to get expenses, not income
    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'transactions'),
      where('type', '==', 'expense')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const categoryData = expenses.reduce((acc, expense) => {
        const category = expense.category || 'Uncategorized';
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
      }, {});

      const labels = Object.keys(categoryData);
      const data = Object.values(categoryData);

      // Generate a different color for each category
      const backgroundColors = labels.map(() =>
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      );

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Amount (in your currency)',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: '#fff',
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  if (loading) {
    return <p>Loading category chart...</p>;
  }
  
  // Display a message if there are no expenses
  if (chartData.datasets[0]?.data.length === 0) {
      return <p>No expenses to display in the chart.</p>;
  }

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '20px auto' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CategoryChart;