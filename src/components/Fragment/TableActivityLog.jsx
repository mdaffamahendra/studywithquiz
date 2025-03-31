import React from "react";
import Table from "../Element/Table";
import { Link } from "react-router-dom";
import { ArrowUpDown, Trash2 } from "lucide-react";

const TableActivityLog = ({handleSort, handleDelete, filteredActivities}) => {
  return (
      <Table style="min-w-max w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              className="border-b p-2 cursor-pointer text-sm md:text-md whitespace-nowrap"
              onClick={() => handleSort("idQuiz.title")}
            >
              Quiz Name <ArrowUpDown size={16} />
            </th>
            <th
              className="border-b p-2 cursor-pointer text-sm md:text-md whitespace-nowrap"
              onClick={() => handleSort("score")}
            >
              Score <ArrowUpDown size={16} />
            </th>
            <th
              className="border-b p-2 cursor-pointer text-sm md:text-md whitespace-nowrap"
              onClick={() => handleSort("date")}
            >
              Date <ArrowUpDown size={16} />
            </th>
            <th className="border-b p-2 text-sm md:text-md whitespace-nowrap">Review</th>
            <th className="border-b p-2 text-sm md:text-md whitespace-nowrap">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 md:p-4 text-sm md:text-md whitespace-nowrap">
                  {activity.idQuiz.title}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-md whitespace-nowrap">
                  {activity.score}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-md whitespace-nowrap">
                  {new Date(activity.completedAt).toLocaleDateString()}
                </td>
                <td className="p-2 md:p-4 text-sm md:text-md whitespace-nowrap">
                  <Link
                    to={`/result-quiz/${activity.resultQuizId}`}
                    className="bg-indigo-600 text-white  px-3 py-1 md:px-4 md:py-2 rounded-md hover:bg-indigo-700"
                  >
                    Review
                  </Link>
                </td>
                <td className="p-2 md:p-4 text-sm md:text-md whitespace-nowrap">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(activity._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No activities yet
              </td>
            </tr>
          )}
        </tbody>
      </Table>
  );
};

export default TableActivityLog;
