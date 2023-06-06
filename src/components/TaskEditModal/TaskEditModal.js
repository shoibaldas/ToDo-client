import React from "react";

const TaskEditModal = ({
  task,
  isEditing,
  editTask,
  closeModal,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleChange,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-3">
      <div className="bg-white p-6 rounded shadow-md h-40">
        {task && (
          <div className="border-t border-gray-200 pt-2">
            <div className="grid grid-cols-1">
              <div>
                <label className="text-sm font-semibold">Task Name</label>
                <input
                  type="text"
                  value={editTask.name}
                  disabled={!isEditing}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
                />
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
              onClick={handleSaveClick}
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

export default TaskEditModal;
