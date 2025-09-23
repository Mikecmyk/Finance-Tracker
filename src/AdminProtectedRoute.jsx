// src/AdminProtectedRoute.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          // Get the user's role from Firestore
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().role === 'admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        }
      }
      setRoleLoading(false);
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  if (loading || roleLoading) {
    // Show a loading message while Firebase and Firestore checks are in progress
    return <p>Loading...</p>;
  }

  // Redirect if the user is not an admin or not logged in
  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is an admin, render the child components (AdminDashboard)
  return children;
};

export default AdminProtectedRoute;