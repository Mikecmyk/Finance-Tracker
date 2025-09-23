// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard"; // Import the new AdminDashboard component
import AdminProtectedRoute from "./AdminProtectedRoute"; // Import the new AdminProtectedRoute component
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster/>
     <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Auth />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
    </>
  );
}

export default App;