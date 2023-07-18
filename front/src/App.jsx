import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToDoListPage from "./pages/ToDoList";
import SmartHomePage from "./pages/SmartHomePage";
import ClipboardPage from "./pages/ClipboardPage";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("auth_token") || null
  );

  // Save authToken to local storage whenever it changes
  useEffect(() => {
    if (authToken === null) {
      localStorage.removeItem("auth_token");
    } else {
      localStorage.setItem("auth_token", authToken);
    }
  }, [authToken]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage authToken={authToken} />}
        />
        <Route
          path="/login"
          element={<LoginPage setAuthToken={setAuthToken} />}
        />
        <Route
          path="/todo"
          element={<ToDoListPage authToken={authToken} />}
        />
        <Route
          path="/smarthome"
          element={<SmartHomePage authToken={authToken} />}
        />
        <Route
          path="/clipboard"
          element={<ClipboardPage authToken={authToken} />}
        />
        {/* Add more routes here for additional modules... */}
      </Routes>
    </Router>
  );
};

export default App;
