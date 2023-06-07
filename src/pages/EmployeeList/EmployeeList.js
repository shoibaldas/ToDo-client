import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi";
import Swal from "sweetalert2";
import EmployeeModal from "../../components/EmployeeModal/EmployeeModal";
import Loader from "../../components/Loader/Loader";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  //for fetching employee data
  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setEmployees(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  // view the data of employee
  const handleItemClick = (id) => {
    const selected = employees.find((employee) => employee._id === id);
    setSelectedEmployee(selected);
    setShowModal(true);
    setIsEditing(false);
  };

  // Setting states for editing employee fields
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    designation: "",
    email: "",
    address: "",
    phone: "",
  });

  // for effecting the changes while editing
  useEffect(() => {
    if (selectedEmployee) {
      setEditedEmployee({
        name: selectedEmployee.name,
        designation: selectedEmployee.designation,
        email: selectedEmployee.email,
        address: selectedEmployee.address,
        phone: selectedEmployee.phone,
      });
    }
  }, [selectedEmployee]);

  //Onchange in the input field
  const handleChange = (field, value) => {
    setEditedEmployee((prevEmployee) => ({
      ...prevEmployee,
      [field]: value,
    }));
  };

  //updating the employee data
  const handleSaveClick = () => {
    const newEmployeeData = {
      ...selectedEmployee,
      ...editedEmployee,
    };

    fetch(
      `http://localhost:5000/update/employee/${selectedEmployee._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployeeData),
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Updated Successfully!",
          });
          const updatedEmployee = employees?.map((employee) =>
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

  //Deleting employee
  const handleDeleteClick = (id) => {
    console.log(id);

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
          const updatedEmployees = employees?.filter(
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

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {employees?.map((employee) => (
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
        <EmployeeModal
          employee={selectedEmployee}
          isEditing={isEditing}
          editedEmployee={editedEmployee}
          closeModal={closeModal}
          handleCancelClick={handleCancelClick}
          handleSaveClick={handleSaveClick}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          handleChange={handleChange}
        ></EmployeeModal>
      )}
    </div>
  );
};

export default EmployeeList;
