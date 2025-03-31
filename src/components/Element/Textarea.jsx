import React from "react";

const Textarea = ({name, placeholder, id, onChange = () => {}, value }) => {
  return (
    <textarea
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full text-sm md:text-md p-2 mt-1 md:p-3 md:mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
};

export default Textarea;
