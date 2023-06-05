import React from "react";
import { Link } from "react-router-dom";
import { BiListCheck } from "react-icons/bi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dashItems = [
    { name: "Home", path: "/" },
    { name: "Add Employee", path: "/add-employee" },
    { name: "Employee List", path: "/employee-list" },
    { name: "Assign Task", path: "/create-task" },
    { name: "Task List", path: "/task-list" },
  ].map((item) => (
    <li key={item.name} className="mb-2 inline-flex items-center hover:bg-gray-500 px-3 transition ease-in duration-300 rounded-md">
      <BiListCheck className="w-6 h-5"> </BiListCheck>
      <Link className="text-gray-300" label={item.name} to={item.path}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    /* Sidebar */
    <div
      className={`bg-blue-900 h-screen text-white w-56 p-6 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Sidebar content */}
      <h2 className="text-2xl font-bold mb-2">Dash Items</h2>
      <div className="border-t border-gray-200 pt-4"></div>
      <ul>{dashItems}</ul>
    </div>
  );
};

export default Sidebar;
