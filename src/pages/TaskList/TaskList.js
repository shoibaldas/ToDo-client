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
  const [employees, setEmployees] = useState([]);
  const [expandedTaskDetails, setExpandedTaskDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalTransfer, setshowModalTransfer] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  //fetching task data from employee and task data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get("https://to-do-server-pi.vercel.app/tasks");
        const employeesResponse = await axios.get(
          "https://to-do-server-pi.vercel.app/employees"
        );
        setTasks(tasksResponse.data.data);
        setEmployees(employeesResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const combinedData = tasks?.map((task) => {
    const employee = employees?.find((emp) => emp._id === task.employeeId);
    return {
      taskId: task._id,
      taskName: task.name,
      employeeId: employee ? employee._id : "",
      employeeName: employee ? employee.name : "",
    };
  });

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

  // for effecting the changes while editting
  useEffect(() => {
    if (selectedTask) {
      setEditTask({ name: selectedTask.name });
    }
  }, [selectedTask]);

  //transfer the data to modal upon clicking
  const handleEditTaskClick = (id, taskName) => {
    const selected = tasks.find((task) => task._id === id);
    setSelectedTask(selected);
    setEditTask({ name: taskName });
    setShowModal(true);
  };

  //transfer the data to modal upon clicking
  const handleItemClickForTransfer = (id) => {
    const selected = tasks.find((task) => task._id === id);
    setSelectedTask(selected);
    setshowModalTransfer(true);
  };

  //for editing task field
  const [editTask, setEditTask] = useState({ name: "" });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  //Onchange in the input field
  const handleChange = (field, value) => {
    setEditTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  //editing task name and updating
  const handleSaveClick = () => {
    if (selectedTask) {
      const newTaskData = {
        ...selectedTask,
        name: editTask.name,
      };

      fetch(`https://to-do-server-pi.vercel.app/update/task/${selectedTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskData),
      })
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
    }
  };

  //transffering task
  const handleTransferClick = () => {
    const updatedTask = { ...selectedTask };
    updatedTask.employeeId = selectedEmployeeId;

    fetch(`https://to-do-server-pi.vercel.app/transfer/employee/${selectedTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Task Transferred Successfully!",
          });
          const updatedTasks = tasks?.map((task) =>
            task._id === selectedTask._id ? updatedTask : task
          );
          setTasks(updatedTasks);
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
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
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
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {combinedData?.map((data) => (
          <div
            key={data.taskId}
            className={`bg-sky-700 text-gray-100 shadow-md rounded-md p-4 ${
              expandedTaskDetails.includes(data.taskId) ? "h-auto" : "h-20"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-semibold">{data.taskName}</h3>
              <button
                onClick={() => toggleExpand(data.taskId)}
                className="text-gray-100 focus:outline-none"
              >
                {expandedTaskDetails.includes(data.taskId) ? (
                  <HiOutlineChevronUp className="h-5 w-5" />
                ) : (
                  <HiOutlineChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            {expandedTaskDetails.includes(data.taskId) && (
              <div>
                <div className="border-t border-gray-200 pt-2 mb-6">
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">Assigned to:</span>{" "}
                        {data.employeeName}
                      </p>
                    </div>
                    <div className="mx-3">
                      <button
                        className="px-2 bg-black text-white py-1 text-sm rounded hover:shadow-lg"
                        onClick={() => handleItemClickForTransfer(data.taskId)}
                      >
                        Change?
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="inline-flex items-center border border-orange-600 px-2 bg-orange-800 text-white py-1 text-sm rounded hover:shadow-lg"
                    onClick={() => handleDeleteClick(data.taskId)}
                  >
                    Delete Task
                    <MdOutlineDelete className="mx-1"></MdOutlineDelete>
                  </button>
                  <button
                    className="inline-flex items-center border border-blue-900 px-2 bg-gray-800 text-white py-1 text-sm rounded hover:shadow-lg"
                    onClick={() =>
                      handleEditTaskClick(data.taskId, data.taskName)
                    }
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
          tasks={employees}
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
