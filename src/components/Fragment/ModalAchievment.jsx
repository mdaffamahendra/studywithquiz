import { useEffect, useState } from "react";
import { X, Trophy, BadgeCheck } from "lucide-react";
import { getData } from "../../fetch";
import { useSelector } from "react-redux";

const AchievementModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [achievements, setAchievements] = useState([]);
  const token = useSelector((state) => state.users.token);

  useEffect(() => {
    const getAchievements = async () => {
      try {
        await getData(`achievements`, token).then((res) => {
          setAchievements(res);
        });
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    };
    getAchievements();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {" "}
      {/* Perubahan di sini */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto relative">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-indigo-600 flex items-center">
            <Trophy className="text-yellow-500 mr-2" /> Achievements
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => onClose(!isOpen)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-3">
          {achievements.map((ach, index) => (
            <div
              key={index}
              className="bg-indigo-50 p-3 rounded-md flex items-start hover:bg-indigo-100 transition-colors"
            >
              <Trophy
                className="text-indigo-500 mr-3 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <div className="flex gap-2">
                  <h3 className="font-semibold text-indigo-700">{ach.name}</h3>
                  <span className="text-indigo-700">
                    {ach.obtained && <BadgeCheck size={20} />}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;
