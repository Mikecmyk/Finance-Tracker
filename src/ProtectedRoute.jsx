// src/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading message while Firebase checks auth state.
    return <p>Loading...</p>;
  }

  // If user is logged in, show the protected content.
  // Otherwise, redirect to the login page.
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;