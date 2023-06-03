import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      designation: "",
      email: "",
      address: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    fetch("http://localhost:5000/employees", {
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
    resetField("name");
    resetField("designation");
    resetField("email");
    resetField("phone");
    resetField("address");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-8">Add Employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          {/* Employee's Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium block">
              Employee's Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Designation */}
          <div className="flex flex-col">
            <label htmlFor="designation" className="font-medium block">
              Designation
            </label>
            <input
              {...register("designation", {
                required: "Designation is required",
              })}
              type="text"
              className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            />
            {errors.designation && (
              <span className="text-red-500">{errors.designation.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium block">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="font-medium block">
              Phone
            </label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="tel"
              //pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium block">
              Address
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="form-textarea bg-gray-100 border border-gray-300 px-3 py-3 rounded-md"
            ></textarea>
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-orange-700 hover:bg-orange-800 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
