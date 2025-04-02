import React from "react";

const LoadingElement = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900  text-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingElement;
