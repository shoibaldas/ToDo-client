import React from "react";

const ModalInputBoxHandler = ({ label, value, disabled, onChange }) => {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="bg-gray-100 border border-gray-300 px-3 py-1 rounded-md w-full"
      />
    </div>
  );
};

export default ModalInputBoxHandler;
