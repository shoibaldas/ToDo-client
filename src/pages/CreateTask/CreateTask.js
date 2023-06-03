import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      taskName: "",
    },
  });

  const onSubmit = (data) => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.results));
          Swal.fire({
            icon: "success",
            title: "Added Successfully!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, try later!",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // reset Field
    resetField("taskName");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8">Create Task</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6 mb-4">
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
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
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
