import React from "react";
import { useNavigate } from "react-router-dom";

const ResultInformation = ({ quizData, formatDateTime, formatTime }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white text-indigo-600 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Result your quiz</h2>
        <p>
          <strong>Quiz ID:</strong> {quizData.quizId}
        </p>
        <p>
          <strong>Nama:</strong> {quizData.userId.username}
        </p>
        <p>
          <strong>Mulai Mengerjakan:</strong>{" "}
          {formatDateTime(quizData.startedAt)}
        </p>
        <p>
          <strong>Selesai Mengerjakan:</strong>{" "}
          {formatDateTime(quizData.completedAt)}
        </p>
        <p>
          <strong>Durasi Mengerjakan:</strong> {formatTime(quizData.duration)}
        </p>
        <p>
          <strong>Total Score:</strong> {quizData.totalScore}
        </p>
      </div>
      {/* Nilai */}
      <div className="bg-white text-indigo-600 p-6 rounded-xl shadow-md flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">Your Score</h2>
        <p className="text-3xl font-extrabold mt-2">{quizData.totalScore}</p>
        <div className="flex gap-6">
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => navigate(`/leaderboard/${quizData.quizId}`)}
          >
            Leaderboard
          </button>
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultInformation;
