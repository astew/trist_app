import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToDoListPage from "./pages/ToDoList";
import SmartHomePage from "./pages/SmartHomePage";
import ClipboardPage from "./pages/ClipboardPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginModal from "./components/LoginModal";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";

import auth from "./script/auth";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // decide whether to navigate to login page
  useEffect(() => {
    async function check_auth() {
      // If we're already on the login page, do nothing
      if (location.pathname === "/modal/login") return;

      // Otherwise, test whether we have a working auth token
      let token_worked = await auth.test_auth();
      if (token_worked) return;

      // We need a new auth token. go to login
      navigate("/modal/login", { state: { previousLocation: location } });
    }
    check_auth();
  }, [navigate, location]);

  return (
    <Stack>
      <Header currentModule="NotImplemented" />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/modal/login"
          element={<LoginModal />}
        />
        <Route
          path="/todo"
          element={<ToDoListPage />}
        />
        <Route
          path="/smarthome"
          element={<SmartHomePage />}
        />
        <Route
          path="/clipboard"
          element={<ClipboardPage />}
        />
        {/* Add more routes here for additional modules... */}
      </Routes>
    </Stack>
  );
};

export default App;
