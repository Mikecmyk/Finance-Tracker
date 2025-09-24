// src/App.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Auth";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import { Toaster } from "react-hot-toast";

// Use React.lazy() to dynamically import your route components
const Dashboard = lazy(() => import("./Dashboard"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));

function App() {
  return (
    <>
      <Toaster />
      {/* Wrap the entire route tree in a Suspense boundary */}
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  );
}

export default App;