import React from "react";
import Button from "../Element/Button";
import { Trophy } from "lucide-react";

const ActivityInformation = ({quizCount, userAchievements, setShowModal, showModal}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white text-indigo-600 p-6 rounded-lg shadow-md">
        <h2 className="text-md md:text-xl font-semibold">Total Quiz Taken</h2>
        <p className="text-2xl md:text-4xl font-bold mt-2">{quizCount}</p>
      </div>
      <div className="bg-white text-indigo-600 p-6 rounded-lg shadow-md">
        <h2 className="text-md md:text-xl font-bold">Achievement</h2>
        <div className="flex items-center gap-2 my-2">
          {userAchievements?.achievementId ? (
            <>
              <Trophy className="text-yellow-500" size={24} />{" "}
              <span>{userAchievements?.achievementId?.name}</span>
            </>
          ) : (
            <span>Anda belum memiliki achievements</span>
          )}
        </div>
        <p className="text-sm">
          {userAchievements?.achievementId?.description}
        </p>
        <Button
          className="text-gray-500 hover:text-gray-700 text-sm text-underline"
          onClick={() => setShowModal(!showModal)}
        >
          Lihat semua
        </Button>
      </div>
    </div>
  );
};

export default ActivityInformation;
