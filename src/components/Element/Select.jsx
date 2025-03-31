import React from "react";

const Select = ({
  name,
  className = "w-full text-sm md:text-md p-2 mt-1 md:p-3 md:mt-2 border border-gray-300 text-indigo-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
  children,
  role,
  onChange = () => {},
}) => {
  return (
    <select id={name} name={name} value={role} className={className} onChange={onChange} required>
        {children}
    </select>
  );
};

export default Select;
