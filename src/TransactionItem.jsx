// src/TransactionItem.jsx
import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import toast from "react-hot-toast";

const TransactionItem = ({ transaction, onEditComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: transaction.description,
    type: transaction.type,
    amount: transaction.amount,
    category: transaction.category,
    notes: transaction.notes,
  });

  const handleDelete = async () => {
    if (!auth.currentUser) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "transactions", transaction.id));
      toast.success("Transaction deleted successfully!");
    } catch (err) {
      toast.error("Error deleting: " + err.message);
    }
  };

  const handleUpdate = async () => {
    if (!auth.currentUser) return;

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid, "transactions", transaction.id), {
        ...editData,
        amount: Number(editData.amount),
      });
      toast.success("Transaction updated successfully!");
      setIsEditing(false);
      if (onEditComplete) {
        onEditComplete();
      }
    } catch (err) {
      toast.error("Error updating: " + err.message);
    }
  };

  const formattedDate = transaction.date?.toDate?.()?.toLocaleString() || 'N/A';

  if (isEditing) {
    return (
      <tr className="border-b dark:border-gray-700">
        <td className="p-3">
          <input
            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
        </td>
        <td className="p-3">
          <input
            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            type="number"
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
          />
        </td>
        <td className="p-3">
          <input
            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          />
        </td>
        <td className="p-3">
          <input
            className="w-full p-1 border rounded dark:bg-gray-700 dark:border-gray-600"
            value={editData.notes}
            onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
          />
        </td>
        <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
          {formattedDate}
        </td>
        <td className="p-3 space-x-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="p-3">{transaction.description}</td>
      <td className={`p-3 font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
        ${transaction.amount.toFixed(2)}
      </td>
      <td className="p-3">{transaction.category || 'N/A'}</td>
      <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
        {transaction.notes || 'N/A'}
      </td>
      <td className="p-3 text-sm text-gray-500 dark:text-gray-400">
        {formattedDate}
      </td>
      <td className="p-3 space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionItem;