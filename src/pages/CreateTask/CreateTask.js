import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateTask = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      taskName: "",
      employeeId: "",
    },
  });

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

  const onSubmit = (data) => {
    const { employeeId, taskName } = data;

    const newTask = {
      name: taskName,
      employeeId: employeeId,
    };
    fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
        if (responseData.success) {
          Swal.fire({
            icon: "success",
            title: "Task Added Successfully!",
          });
          reset();
          navigate("/task-list");
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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8">Assign Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mb-4">
          {/* Employee Name */}
          <div className="flex flex-col">
            <label htmlFor="employeeId" className="font-medium block">
              Employee Name
            </label>
            <select
              {...register("employeeId", {
                required: "Employee name is required",
              })}
              className="form-select bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            >
              <option value="">Select an employee</option>
              {employees?.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
            {errors.employeeId && (
              <span className="text-red-500 text-sm">
                {errors.employeeId.message}
              </span>
            )}
          </div>

          {/* Task Name */}
          <div className="flex flex-col">
            <label htmlFor="taskName" className="font-medium block">
              Task Name
            </label>
            <textarea
              {...register("taskName", { required: "Task name is required" })}
              className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            ></textarea>
            {errors.taskName && (
              <span className="text-red-500 text-sm">
                {errors.taskName.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="grid grid-cols-1">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
