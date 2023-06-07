import React from "react";

const TaskTransferModal = ({
  tasks,
  selectedTask,
  selectedEmployeeId,
  setSelectedEmployeeId,
  isEditing,
  handleCancelClick,
  closeModal,
  handleTransferClick,
  handleEditClick,
}) => {
  console.log(selectedEmployeeId);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
      <div className="bg-white p-6 rounded shadow-md h-40">
        {selectedTask && (
          <div className="border-t border-gray-200 pt-2">
            <div className="grid grid-cols-1">
              <div>
                <label className="text-sm font-semibold block mb-3">
                  Click "Edit" to transfer task
                </label>
                <select
                  disabled={!isEditing}
                  className="form-select bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                >
                  <option value="">Select an available employee</option>
                  {tasks?.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end mt-6">
          {isEditing ? (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 text-sm rounded"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          ) : (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 text-sm rounded"
              onClick={closeModal}
            >
              Close
            </button>
          )}

          {isEditing ? (
            <button
              onClick={handleTransferClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded ml-2"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded ml-2"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskTransferModal;
