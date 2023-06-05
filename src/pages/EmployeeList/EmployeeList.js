import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //for editing employee field
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // for effecting the changes while editting
  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setDesignation(selectedEmployee.designation);
      setEmail(selectedEmployee.email);
      setAddress(selectedEmployee.address);
      setPhone(selectedEmployee.phone);
    }
  }, [selectedEmployee]);

  //for fetching employee data
  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  //view the data of employee
  const handleItemClick = (id) => {
    const selected = employees.find((employee) => employee._id === id);
    setSelectedEmployee(selected);
    setShowModal(true);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  //updating the employee data
  const handleSaveClick = () => {
    const newEmployeeData = {
      ...selectedEmployee,
      name,
      designation,
      email,
      address,
      phone,
    };

    fetch(`http://localhost:5000/update/employee/${selectedEmployee._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
          });
          const updatedEmployee = employees.map((employee) =>
            employee._id === selectedEmployee._id ? newEmployeeData : employee
          );
          setEmployees(updatedEmployee);
          setIsEditing(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, try again!",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:5000/delete/employee/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted Successfully!",
          });
          const updatedEmployees = employees.filter(
            (employee) => employee._id !== id
          );
          setEmployees(updatedEmployees);
          closeModal();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, try again!",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="bg-sky-700 shadow-md rounded-md p-2"
          >
            <div className="flex items-center justify-between mb-2 mt-2">
              <h3 className="text-md font-semibold text-gray-200">
                {employee.name}
              </h3>
              <button
                onClick={() => handleItemClick(employee._id)}
                className="bg-blue-900 px-2 py-1 rounded-lg text-gray-200 border border-gray-400 focus:outline-none inline-flex items-center text-sm"
              >
                View Details
                <HiOutlineEye className="mx-2 h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
          <div className="bg-white p-6 rounded shadow-md h-96 overflow-x-scroll">
            {selectedEmployee && (
              <div>
                <h2 className="font-semibold">Employee Details</h2>
                <div className="border-t border-gray-200 pt-2"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold">Name</label>
                    <input
                      type="text"
                      value={name}
                      disabled={!isEditing}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Designation</label>
                    <input
                      type="text"
                      value={designation}
                      disabled={!isEditing}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Email</label>
                    <input
                      type="text"
                      value={email}
                      disabled={!isEditing}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Address</label>
                    <input
                      type="text"
                      value={address}
                      disabled={!isEditing}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold">Phone</label>
                    <input
                      type="text"
                      value={phone}
                      disabled={!isEditing}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center mt-12">
              <div>
                <button
                  className="border border-red-900 text-red-700 px-4 py-2 rounded hover:shadow-lg"
                  onClick={() => handleDeleteClick(selectedEmployee._id)}
                >
                  Delete Employee
                </button>
              </div>
              <div className="flex justify-end">
                {isEditing ? (
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                )}

                {isEditing ? (
                  <button
                    onClick={handleSaveClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
