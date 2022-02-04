import { Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

import './styles/classroom.scss'


const TeacherDashboard = () => {
    return (
        <React.Fragment>
            <NavBar />
            <Container fixed className="classroom-container">
                <Outlet />
            </Container>
        </React.Fragment>
    );
};
export default TeacherDashboard;
