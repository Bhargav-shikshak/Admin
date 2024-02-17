// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>TSConnect</h2>
      <ul>
        <li>
          <Link to="/React-Sidebar-example/dashboard">
         
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/React-Sidebar-example/TeacherComponent">
          
            <span>Teacher</span>
          </Link>
        </li>
        <li>
          <Link to="/React-Sidebar-example/StudentComponent">
         
            <span>Student</span>
          </Link>
        </li>
        <li>
          <Link to="/React-Sidebar-example/studentRequest">
          
            <span>StudentRequest</span>
          </Link>
        </li>
        <li>
          <Link to="/React-Sidebar-example/teacherMatch">
          
            <span>TeacherMatch</span>
          </Link>
        </li>
        <li>
          <Link to="/React-Sidebar-example/assignteacher">
        
            <span>Assignteacher</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
