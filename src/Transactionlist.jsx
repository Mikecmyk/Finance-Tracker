// src/Transactionlist.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import TransactionItem from "./TransactionItem";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    type: "",
    amount: "",
    category: "",
    notes: "",
  });

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "users", auth.currentUser.uid, "transactions"),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(items);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (!auth.currentUser) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "transactions", id));
     toast.success("Transaction deleted successfully!");
    } catch (err) {
      toast.error("Error deleting: " + err.message);
    }
  };

  const handleEdit = (tx) => {
    setEditingId(tx.id);
    setEditData({
      type: tx.type,
      amount: tx.amount,
      category: tx.category,
      notes: tx.notes,
    });
  };

  const handleUpdate = async (id) => {
    if (!auth.currentUser) return;

    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid, "transactions", id), {
        ...editData,
        amount: Number(editData.amount),
      });
       toast.success("Transaction updated successfully!");
      setEditingId(null);
    } catch (err) {
       toast.error("Error updating: " + err.message);
    }
  };

  if (!transactions.length) return <p>No transactions yet.</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Transactions:</h3>
      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Notes</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              {editingId === tx.id ? (
                <>
                  <td>
                    <input
                      value={editData.type}
                      onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      value={editData.notes}
                      onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                    />
                  </td>
                  <td>{tx.date && typeof tx.date.toDate === "function" ? tx.date.toDate().toLocaleString() : 'N/A'}</td>
                  <td>
                    <button onClick={() => handleUpdate(tx.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{tx.type}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.category}</td>
                  <td>{tx.notes}</td>
                  <td>{tx.date && typeof tx.date.toDate === "function" ? tx.date.toDate().toLocaleString() : 'N/A'}</td>
                  <td>
                    <button onClick={() => handleEdit(tx)}>Edit</button>
                    <button onClick={() => handleDelete(tx.id)} style={{ color: "red" }}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;