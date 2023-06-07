import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import InputBoxHandler from "../../components/InputBoxHandler/InputBoxHandler";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
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
          navigate("/employee-list");
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
          <InputBoxHandler
            label="Employee's Name"
            name="name"
            register={register}
            error={errors.name}
          />

          {/* Designation */}
          <InputBoxHandler
            label="Designation"
            name="designation"
            register={register}
            error={errors.designation}
          />

          {/* Email */}
          <InputBoxHandler
            label="Email"
            name="email"
            register={register}
            error={errors.email}
          />

          {/* Phone */}
          <InputBoxHandler
            label="Phone"
            name="phone"
            register={register}
            error={errors.phone}
          />

          {/* Address */}
          <InputBoxHandler
            label="Address"
            name="address"
            register={register}
            error={errors.address}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
