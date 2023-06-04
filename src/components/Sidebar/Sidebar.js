import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    /* Sidebar */
    <div
      className={`bg-gray-800 h-screen text-white w-56 p-6 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Sidebar content */}
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <Link
            to="/add-employee"
            className="text-blue-300 hover:text-blue-200"
          >
            Add Employee
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/employee-list"
            className="text-blue-300 hover:text-blue-200"
          >
            Employee List
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/create-task" className="text-blue-300 hover:text-blue-200">
            Assign Task
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/task-list" className="text-blue-300 hover:text-blue-200">
            Task List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
