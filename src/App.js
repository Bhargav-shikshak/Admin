// App.js
import React from "react";
import Sidebar from "./components/sidebar";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentComponent from "./pages/Student";
import TeacherComponent from "./pages/Teacher";
import StudentRequest from "./pages/Studentrequest";
import TeacherMatch from "./pages/Teachermatch";

import {app} from './fierbase/fierbase';

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div style={{ maxWidth: "lg", margin: "auto" }}>
            <Routes>
              <Route
                exact
                path={"/React-Sidebar-example/dashboard"}
                element={<Dashboard />}
              />
              <Route
                path={"/React-Sidebar-example/StudentComponent"}
                element={<StudentComponent />}
              />
              <Route
                path={"/React-Sidebar-example/TeacherComponent"}
                element={<TeacherComponent/>}
              />
              <Route
                path={"/React-Sidebar-example/studentRequest"}
                element={<StudentRequest />}
              />
              <Route
                path={"/React-Sidebar-example/teacherMatch"}
                element={<TeacherMatch />}
              />
             
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
