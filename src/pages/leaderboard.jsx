import { useEffect, useState } from "react";
import { Crown, Calendar, User, Book } from "lucide-react";
import { formatDateTime, getData } from "../fetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Element/Navbar";
import PageLayout from "../components/Layout/PageLayout";

const Leaderboard = () => {
  const [quizInfo, setQuizInfo] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const { quizId } = useParams();
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);
  const role = user?.role;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        await getData(`leaderboard/${quizId}`, token).then((res) => {
          setQuizInfo(res.quiz);
          setLeaderboard(res.leaderboard);
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLeaderboard();
  }, [quizId]);

  const rankIcons = [
    <Crown key={1} className="text-yellow-500" size={20} />,
    <Crown key={2} className="text-gray-400" size={20} />,
    <Crown key={3} className="text-orange-500" size={20} />,
  ];

  return (
    <PageLayout>
      <div className="min-h-screen px-2 py-24">
        {quizInfo && (
          <div className="text-indigo-600 bg-white p-4 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-semibold">{quizInfo.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <User size={16} /> <span>{quizInfo.createdBy.username}</span>
              <Calendar size={16} />{" "}
              <span>{formatDateTime(quizInfo.timeStart)}</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Book size={16} /> <span>{quizInfo.description}</span>
            </div>
          </div>
        )}
        <div className="bg-white text-indigo-600 black p-4 rounded-lg shadow-md overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-indigo-200 font-bold">
                <th className="py-2 px-4 text-left whitespace-nowrap">Rank</th>
                <th className="py-2 px-4 text-left whitespace-nowrap">Name</th>
                <th className="py-2 px-4 text-left whitespace-nowrap">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((player, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 flex items-center gap-2">
                    {index < 3 ? rankIcons[index] : index + 1}
                  </td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    {player.userId.username}
                  </td>
                  <td className="py-2 px-4 font-semibold whitespace-nowrap">
                    {player.totalScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default Leaderboard;
