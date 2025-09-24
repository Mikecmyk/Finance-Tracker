// src/Dashboard.jsx
import React, { useContext, useState } from "react";
import FinancialSummary from "./FinancialSummary";
import MonthlyChart from "./MonthlyChart";
import CategoryChart from "./CategoryChart";
import TransactionForm from "./TransactionForm";
import TransactionList from "./Transactionlist";
import { ThemeContext } from "./ThemeContext";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

function Dashboard() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Form state
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast("You have been logged out!", {});
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed.");
    }
  };

  const addTransaction = async (e) => {
    e.preventDefault(); // Prevents the page from reloading

    if (!auth.currentUser) {
      toast.error("You must be logged in to add a transaction.");
      return;
    }

    if (!amount || amount <= 0 || !desc) {
      toast.error("Please enter a valid amount and description.");
      return;
    }

    try {
      await addDoc(
        collection(db, "users", auth.currentUser.uid, "transactions"),
        {
          desc,
          amount: Number(amount),
          type,
          category,
          notes,
          date: serverTimestamp(),
        }
      );
      toast.success("Transaction added successfully!");

      // Clear the form after submission
      setDesc("");
      setAmount("");
      setType("income");
      setCategory("");
      setNotes("");
    } catch (err) {
      console.error("Error adding transaction:", err);
      toast.error("Failed to add transaction. Please try again.");
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-800 transition-colors duration-300">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:!text-white mb-4 sm:mb-0">
          Finance Dashboard
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </header>

      <FinancialSummary />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <MonthlyChart />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <CategoryChart />
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <TransactionForm
          desc={desc}
          setDesc={setDesc}
          amount={amount}
          setAmount={setAmount}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          notes={notes}
          setNotes={setNotes}
          onSubmit={addTransaction}
          editMode={false} // Since this is the add form, editMode is false
        />
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <TransactionList />
      </div>
    </div>
  );
}

export default Dashboard;