import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

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
      employeeName: "",
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
    const { employeeName, taskName } = data;

    const selectedEmployee = JSON.parse(employeeName);

    if (selectedEmployee) {
      const updatedEmployee = {
        ...selectedEmployee,
        task: { name: taskName },
      };

      fetch(`http://localhost:5000/employees/${selectedEmployee._id}`, {
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
      <h2 className="text-2xl font-bold mb-8">Create Task</h2>
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
            <input
              {...register("taskName", { required: "Task name is required" })}
              type="text"
              className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            />
            {errors.taskName && (
              <span className="text-red-500 text-sm">
                {errors.taskName.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-orange-700 hover:bg-orange-800 text-white py-2 px-4 rounded-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
