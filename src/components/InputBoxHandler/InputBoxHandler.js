import React from "react";

const InputBoxHandler = ({ label, name, register, error }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-medium block">
        {label}
      </label>
      <input
        {...register(name, { required: `${label} is required` })}
        type="text"
        className="form-input bg-gray-100 border border-gray-300 px-3 py-1 rounded-md"
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputBoxHandler;
