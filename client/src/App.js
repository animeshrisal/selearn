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
import Feed from "./modules/dashboard/pages/Feed";
import Classroom from "./modules/dashboard/pages/Classroom";
import ClassroomList from "./modules/dashboard/pages/ClassroomList";
import Lesson from "./modules/dashboard/pages/Lesson";
const queryClient = new QueryClient();

function App() {
  return (
    <AuthenticationProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/login/" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route path="/auth/:uid/:token" element={<ConfirmUser />} />
              <Route path="/dashboard/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }>
                <Route path="" element={
                  <PrivateRoute>
                    <Feed />
                  </PrivateRoute>
                } />
                <Route path="classroom/" element={
                  <PrivateRoute>
                    <ClassroomList />
                  </PrivateRoute>
                } />
                <Route path="classroom/:classroomId" element={
                  <PrivateRoute>
                    <Classroom />
                  </PrivateRoute>
                } />
                <Route path="classroom/:classroomId/lesson/:lessonId" element={
                  <PrivateRoute>
                    <Lesson />
                  </PrivateRoute>
                } />
              </Route>

            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </SocketProvider>
    </AuthenticationProvider>
  );
}

export default App;
