import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./modules/shared/components/PrivateRoute";
import Login from "./modules/auth/pages/Login";
import './App.scss'
import Register from "./modules/auth/pages/Register";
import Dashboard from "./modules/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
