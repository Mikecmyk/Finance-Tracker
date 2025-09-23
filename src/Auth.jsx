import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";
import { AuthContext } from "./AuthContext";
import { ThemeContext } from "./ThemeContext";
import toast from "react-hot-toast";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleTheme}
          className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none"
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="text-white">
          <h1 className="text-4xl sm:text-5xl font-bold">Welcome to Finance Tracker.</h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Take control of your finances. Track your income and expenses,
            visualize your spending habits, and achieve your financial goals.
          </p>
        </div>

        {/* Login/Register Form Card */}
        <div className="w-full max-w-sm p-8 mt-8 bg-white/20 dark:bg-gray-800/20 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center mb-6">{isLogin ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {isLogin && (
            <p onClick={handlePasswordReset} className="mt-4 text-center text-sm cursor-pointer text-blue-500 hover:underline">
              Forgot Password?
            </p>
          )}

          <p onClick={() => setIsLogin(!isLogin)} className="mt-4 text-center text-sm cursor-pointer text-blue-500 hover:underline">
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;