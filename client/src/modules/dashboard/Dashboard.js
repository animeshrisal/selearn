import { Container } from "@mui/material";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "../shared/components/PrivateRoute";
import NavBar from "./components/NavBar";
import Classroom from "./pages/Classroom";
import Feed from "./pages/Feed";
import './styles/classroom.scss'


const Dashboard = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Container fixed className="classroom-container">
                <Outlet />
            </Container>
        </React.Fragment>
    );
};
export default Dashboard;
