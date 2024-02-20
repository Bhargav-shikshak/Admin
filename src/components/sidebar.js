// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Shikshak Admin</h2>
      <ul>
        <li>
          <Link to="dashboard">
         
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="TeacherComponent">
          
            <span>Teacher</span>
          </Link>
        </li>
        <li>
          <Link to="StudentComponent">
         
            <span>Student</span>
          </Link>
        </li>
        <li>
          <Link to="studentRequest">
          
            <span>StudentRequest</span>
          </Link>
        </li>
        
        <li>
         
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
