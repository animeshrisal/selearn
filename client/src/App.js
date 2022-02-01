import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./modules/shared/components/PrivateRoute";
import Login from "./modules/auth/pages/Login";
import './App.scss'
import Register from "./modules/auth/pages/Register";
import Dashboard from "./modules/dashboard/Dashboard";
import { SocketProvider, AuthenticationProvider } from "./modules/shared/context";
import { QueryClient, QueryClientProvider } from "react-query";
import ConfirmUser from "./modules/auth/pages/ConfirmUser";
const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/auth/:uid/:token" element={<ConfirmUser />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </SocketProvider>
    </AuthenticationProvider>
  );
}

export default App;
