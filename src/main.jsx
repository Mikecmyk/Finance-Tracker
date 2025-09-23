// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import { ThemeProvider } from "./ThemeContext.jsx"; // Import the ThemeProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Finance-Tracker">
      {/* Wrap the app with both providers */}
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);