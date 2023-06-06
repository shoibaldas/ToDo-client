import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import Swal from "sweetalert2";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Loader from "../../components/Loader/Loader";
import TaskEditModal from "../../components/TaskEditModal/TaskEditModal";
import TaskTransferModal from "../../components/TaskTransferModal/TaskTransferModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskDetails, setExpandedTaskDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalTransfer, setshowModalTransfer] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  //fetching task data from employee data
  useEffect(() => {
    axios
      .get("https://to-do-server-pi.vercel.app/employees")
      .then((response) => {
        setTasks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //toggle to show the more data for task assigned
  const toggleExpand = (taskId) => {
    setExpandedTaskDetails((expandedTask) => {
      if (expandedTask.includes(taskId)) {
        return expandedTask.filter((id) => id !== taskId);
      } else {
        return [...expandedTask, taskId];
      }
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setshowModalTransfer(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleItemClick = (id) => {
    const selected = tasks.find((task) => task._id === id);
    setSelectedTask(selected);
    setShowModal(true);
  };

  const handleItemClickForTransfer = (id) => {
    const selected = tasks.find((task) => task._id === id);
    setSelectedTask(selected);
    setshowModalTransfer(true);
  };

  //for editing task field
  const [editTask, setEditTask] = useState({ name: "" });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  // for effecting the changes while editting
  useEffect(() => {
    if (selectedTask && selectedTask.task) {
      setEditTask({ name: selectedTask.task.name });
    }
  }, [selectedTask]);

  const handleChange = (field, value) => {
    //Onchange in the input field
    setEditTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  //editing task name and updating
  const handleSaveClick = () => {
    const newTaskData = {
      ...selectedTask,
      task: {
        ...selectedTask.task,
        name: editTask.name, // Update the task name directly
      },
    };

    console.log(newTaskData);

    fetch(
      `https://to-do-server-pi.vercel.app/update/task/${selectedTask._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskData),
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
          const updatedTask = tasks?.map((taskData) =>
            taskData._id === selectedTask._id ? newTaskData : taskData
          );
          setTasks(updatedTask);
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

  const handleTransferClick = () => {
    const transferToEmployee = tasks.find(
      (employee) => employee._id === selectedEmployeeId
    );

    // Updating the task list
    const updatedTaskList = tasks.map((employee) => {
      if (employee._id === selectedTask._id) {
        return {
          ...employee,
          task: null,
        };
      } else if (employee._id === transferToEmployee._id) {
        return {
          ...employee,
          task: selectedTask.task,
        };
      } else {
        return employee;
      }
    });

    setTasks(updatedTaskList);

    fetch(`https://to-do-server-pi.vercel.app/transfer/employee`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaskList), // Send only the updated task data
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Task Transferred Successfully!",
          });
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

  //Deleting a task
  const handleDeleteClick = (id) => {
    fetch(`https://to-do-server-pi.vercel.app/delete/task/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Task Deleted Successfully!",
          });
          const updatedTasks = tasks.map((taskList) => {
            if (taskList._id === id) {
              // Remove the 'task' attribute from the employee
              const { task, ...updatedEmployee } = taskList;
              return updatedEmployee;
            }
            return taskList;
          });
          setTasks(updatedTasks);
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

  //filtering out the task attribute from the employee array
  const filteredTasks = tasks?.filter((task) => task.task);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredTasks?.map((task) => (
          <div
            key={task._id}
            className={`bg-sky-700 text-gray-100 shadow-md rounded-md p-4 ${
              expandedTaskDetails.includes(task._id) ? "h-auto" : "h-20"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-semibold">{task.task.name}</h3>
              <button
                onClick={() => toggleExpand(task._id)}
                className="text-gray-100 focus:outline-none"
              >
                {expandedTaskDetails.includes(task._id) ? (
                  <HiOutlineChevronUp className="h-5 w-5" />
                ) : (
                  <HiOutlineChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            {expandedTaskDetails.includes(task._id) && (
              <div>
                <div className="border-t border-gray-200 pt-2 mb-6">
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Assigned to:</span>{" "}
                        {task.name}
                      </p>
                    </div>
                    <div className="mx-3">
                      <button
                        className="px-2 bg-black text-white py-1 text-sm rounded hover:shadow-lg"
                        onClick={() => handleItemClickForTransfer(task._id)}
                      >
                        Change?
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="inline-flex items-center border border-orange-600 px-2 bg-orange-800 text-white py-1 text-sm rounded hover:shadow-lg"
                    onClick={() => handleDeleteClick(task._id)}
                  >
                    Delete Task
                    <MdOutlineDelete className="mx-1"></MdOutlineDelete>
                  </button>
                  <button
                    className="inline-flex items-center border border-blue-900 px-2 bg-gray-800 text-white py-1 text-sm rounded hover:shadow-lg"
                    onClick={() => handleItemClick(task._id)}
                  >
                    Edit Task
                    <AiOutlineEdit className="mx-1"></AiOutlineEdit>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showModalTransfer && (
        <TaskTransferModal
          closeModal={closeModal}
          isEditing={isEditing}
          handleCancelClick={handleCancelClick}
          handleEditClick={handleEditClick}
          handleTransferClick={handleTransferClick}
          selectedTask={selectedTask}
          selectedEmployeeId={selectedEmployeeId}
          setSelectedEmployeeId={setSelectedEmployeeId}
          tasks={tasks}
        ></TaskTransferModal>
      )}
      {showModal && (
        <TaskEditModal
          task={selectedTask}
          isEditing={isEditing}
          editTask={editTask}
          closeModal={closeModal}
          handleEditClick={handleEditClick}
          handleSaveClick={handleSaveClick}
          handleCancelClick={handleCancelClick}
          handleChange={handleChange}
        ></TaskEditModal>
      )}
    </div>
  );
};

export default TaskList;
