import React from "react";
import { MdOutlineDelete } from "react-icons/md";

const EmployeeModal = ({
  employee,
  isEditing,
  closeModal,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleDeleteClick,
  handleChange,
}) => {
  const { name, designation, email, address, phone } = employee;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
      <div className="bg-white p-6 rounded shadow-md h-96 overflow-x-scroll">
        {employee && (
          <div>
            <h2 className="font-semibold">Employee Details</h2>
            <div className="border-t border-gray-200 pt-2"></div>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold">Name</label>
                <input
                  type="text"
                  value={name}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                />
              </div>
              {/* Designation */}
              <div>
                <label className="text-sm font-semibold">Designation</label>
                <input
                  type="text"
                  value={designation}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                />
              </div>
              {/* Email */}
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="text"
                  value={email}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                />
              </div>
              {/* Address */}
              <div>
                <label className="text-sm font-semibold">Address</label>
                <input
                  type="text"
                  value={address}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                />
              </div>
              {/* Phone */}
              <div>
                <label className="text-sm font-semibold">Phone</label>
                <input
                  type="text"
                  value={phone}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-12">
          <div>
            {/* Delete Employee */}
            <button
              className="inline-flex items-center text-sm border border-red-900 text-red-700 px-4 py-1 rounded hover:shadow-lg hover:bg-red-800 hover:text-white"
              onClick={handleDeleteClick}
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
