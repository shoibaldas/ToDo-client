import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const CreateTask = () => {
  const [employees, setEmployees] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      taskName: "",
    },
  });

  useEffect(() => {
    axios
      .get("https://to-do-server-pi.vercel.app/employees")
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    const { employeeName, taskName } = data;
    const taskId = uuidv4();

    const selectedEmployee = JSON.parse(employeeName);

    if (selectedEmployee) {
      const updatedEmployee = {
        ...selectedEmployee,
        task: {
          id: taskId, // Add the taskId to the task object
          name: taskName,
        },
      };

      fetch(`https://to-do-server-pi.vercel.app/employees/${selectedEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8">Assign Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mb-4">
          {/* Employee Name */}

          <div className="flex flex-col">
            <label htmlFor="employeeName" className="font-medium block">
              Employee Name
            </label>
            <select
              {...register("employeeName", {
                required: "Employee name is required",
              })}
              className="form-select bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            >
              <option value="">Select an employee</option>
              {employees?.map((employee) => {
                const ifTaskExist =
                  employee.task && Object.keys(employee.task).length > 0;

                if (!ifTaskExist) {
                  return (
                    <option key={employee._id} value={JSON.stringify(employee)}>
                      {employee.name}
                    </option>
                  );
                }
                return null;
              })}
            </select>
            {errors.employeeName && (
              <span className="text-red-500 text-sm">
                {errors.employeeName.message}
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
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md "
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
