import { Search } from "lucide-react";
import React from "react";
import Input from "../Element/Input";
import TableActivityLog from "./TableActivityLog";

const ActivityLog = ({
  handleSort,
  searchQuery,
  handleSearch,
  handleDelete,
  filteredActivities,
}) => {
  return (
    <div className="bg-white text-indigo-600 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md md:text-xl font-semibold">Activity</h2>
        <div className="flex items-center gap-2">
          <Input
            type={"text"}
            placeholder={"Search..."}
            className={
              "border border-indigo-600 p-2 w-32 md:w-56 rounded-md text-black text-sm md:text-md focus:outline-indigo-600 text-indigo-600"
            }
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search size={20} className="text-indigo-600" />
        </div>
      </div>
      <div className="overflow-auto w-full">
        <TableActivityLog
          handleSort={handleSort}
          handleDelete={handleDelete}
          filteredActivities={filteredActivities}
        />
      </div>
    </div>
  );
};

export default ActivityLog;
