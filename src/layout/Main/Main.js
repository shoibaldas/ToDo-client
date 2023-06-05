import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

const Main = () => {
  const [isOpen, setIsOpen] = useState(true); // Set isOpen to true initially

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the value of isOpen
  };

  return (
    <div className="mx-auto sm:max-w-xl md:max-w-full shadow-lg">
      <div className="flex h-screen">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}></Sidebar>
        {/* Main Content */}
        <div className="flex-grow bg-white">
          {/* Navbar */}
          <div className="bg-gray-200 text-white flex items-center justify-between px-6 py-3">
            <button
              className="bg-orange-700 text-white px-3 py-2 rounded-md"
              onClick={toggleSidebar} // Use toggleSidebar directly without passing any parameter
            >
              {/* Use the appropriate icon based on the sidebar state */}
              {isOpen ? (
                <LuPanelLeftClose size={20} />
              ) : (
                <LuPanelRightClose size={20} />
              )}
            </button>
          </div>
          {/* Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
