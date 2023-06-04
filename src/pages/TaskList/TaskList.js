import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskDetails, setExpandedTaskDetails] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employees")
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleExpand = (taskId) => {
    setExpandedTaskDetails((expandedTask) => {
      if (expandedTask.includes(taskId)) {
        return expandedTask.filter((id) => id !== taskId);
      } else {
        return [...expandedTask, taskId];
      }
    });
  };

  const filteredTasks = tasks.filter((task) => task.task);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className={`bg-gray-100 shadow-md rounded-md p-4 ${expandedTaskDetails.includes(task._id) ? "h-auto" : "h-20"}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{task.task.name}</h3>
              <button
                onClick={() => toggleExpand(task._id)}
                className="text-gray-500 focus:outline-none"
              >
                {expandedTaskDetails.includes(task._id) ? (
                  <HiOutlineChevronUp className="h-5 w-5" />
                ) : (
                  <HiOutlineChevronDown className="h-5 w-5" />
                )}
              </button>
            </div>
            {expandedTaskDetails.includes(task._id) && (
              <div className="border-t border-gray-200 pt-2">
                <p className="text-sm">
                  <span className="font-semibold">Assigned to:</span>{" "}
                  {task.name}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
