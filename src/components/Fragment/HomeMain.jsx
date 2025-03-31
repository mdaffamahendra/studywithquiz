import React from "react";
import HomeMainNavigation from "./HomeMainNavigation";
import HomeMainContent from "./HomeMainContent";

const HomeMain = ({ role, username }) => {
  return (
    <div className="justify-center items-center bg-gray-100 text-indigo-600 min-h-screen font-poppins">
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-6 px-6 py-4">
        <HomeMainContent username={username} />
        <HomeMainNavigation role={role} />
      </div>
    </div>
  );
};

export default HomeMain;
