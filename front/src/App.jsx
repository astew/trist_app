import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToDoListPage from "./pages/ToDoListPage";
import SmartHomePage from "./pages/SmartHomePage";
import ClipboardPage from "./pages/ClipboardPage";
import LoginModal from "./components/LoginModal";
import Stack from "react-bootstrap/Stack";
import Header from "./components/Header";

const App = () => {
  return (
    <Stack>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<LoginModal />}
        />
        <Route
          path="/todo/*"
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
      </Routes>
    </Stack>
  );
};

export default App;
