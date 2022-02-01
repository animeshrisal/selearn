import { Container } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../shared/components/PrivateRoute";


const Dashboard = () => {
    return (
        <Container>
            <Routes>
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
            </Routes>
        </Container>
    );
};
export default Dashboard;
