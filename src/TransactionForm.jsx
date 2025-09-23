// src/TransactionForm.jsx
import React from "react";

function TransactionForm({
  desc,
  setDesc,
  amount,
  setAmount,
  type,
  setType,
  category,
  setCategory,
  notes,
  setNotes,
  onSubmit,
  editMode,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h2 className="text-xl font-semibold">
        {editMode ? "Edit Transaction" : "Add Transaction"}
      </h2>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;