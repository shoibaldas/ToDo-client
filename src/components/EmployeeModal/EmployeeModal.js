import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import ModalInputBoxHandler from "../ModalInputBoxHandler/ModalInputBoxHandler";

const EmployeeModal = ({
  employee,
  isEditing,
  closeModal,
  editedEmployee,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteClick,
  handleChange,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
      <div className="bg-white p-6 rounded shadow-md h-96 overflow-x-scroll">
        {employee && (
          <div>
            <h2 className="font-semibold">Employee Details</h2>
            <div className="border-t border-gray-200 pt-2"></div>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <ModalInputBoxHandler
                label="Name"
                value={editedEmployee.name}
                disabled={!isEditing}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {/* Designation */}
              <ModalInputBoxHandler
                label="Designation"
                value={editedEmployee.designation}
                disabled={!isEditing}
                onChange={(e) => handleChange("designation", e.target.value)}
              />
              {/* Email */}
              <ModalInputBoxHandler
                label="Email"
                value={editedEmployee.email}
                disabled={!isEditing}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {/* Address */}
              <ModalInputBoxHandler
                label="Address"
                value={editedEmployee.address}
                disabled={!isEditing}
                onChange={(e) => handleChange("address", e.target.value)}
              />
              {/* Phone */}
              <ModalInputBoxHandler
                label="Phone"
                value={editedEmployee.phone}
                disabled={!isEditing}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-12">
          <div>
            {/* Delete Employee */}
            <button
              className="inline-flex items-center text-sm border border-red-900 text-red-700 px-4 py-1 rounded hover:shadow-lg hover:bg-red-800 hover:text-white"
              onClick={() => handleDeleteClick(employee._id)}
            >
              Delete Employee
              <MdOutlineDelete></MdOutlineDelete>
            </button>
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              //Cancel operation
              <button
                className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            ) : (
              //Close operation
              <button
                className="text-sm bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            )}

            {isEditing ? (
              //Update the changes operation
              <button
                onClick={handleSaveClick}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded ml-2"
              >
                Save Changes
              </button>
            ) : (
              //Make the info editable operation
              <button
                onClick={handleEditClick}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded ml-2"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
