// src/MonthlyChart.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { db, auth } from './firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart = () => {
  const { theme } = useContext(ThemeContext); // Use theme context to determine colors
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'users', auth.currentUser.uid, 'transactions'),
      orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const monthlyData = transactions.reduce((acc, transaction) => {
        const date = transaction.date?.toDate();
        if (!date) return acc;

        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!acc[monthYear]) {
          acc[monthYear] = { income: 0, expense: 0 };
        }

        if (transaction.type === 'income') {
          acc[monthYear].income += transaction.amount;
        } else if (transaction.type === 'expense') {
          acc[monthYear].expense += transaction.amount;
        }

        return acc;
      }, {});

      const labels = Object.keys(monthlyData).sort();
      const incomeData = labels.map(month => monthlyData[month].income);
      const expenseData = labels.map(month => monthlyData[month].expense);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
          {
            label: 'Expenses',
            data: expenseData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const textColor = theme === 'dark' ? 'rgb(229, 231, 235)' : 'rgb(107, 114, 128)';
  
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to scale
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: 'Monthly Income vs. Expenses',
        color: textColor,
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading chart...</p>;
  }

  return (
    <div className="w-full h-80">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyChart;