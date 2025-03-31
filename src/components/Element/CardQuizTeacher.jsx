import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { ChartNoAxesColumnIncreasing, Eye, FilePenLine, Trash2 } from "lucide-react";

const CardQuizTeacher = ({ quiz, index, formatDateTime, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div key={index} className="bg-white shadow-lg px-6 py-8 rounded-lg">
      <h2 className="text-xl text-indigo-600 font-bold mb-2">{quiz.title}</h2>
      <p className="text-gray-600">ID Quiz: {quiz.quizId}</p>
      <p className="text-gray-600">
        Dibuat oleh: {quiz.createdBy?.username || "Unknown"}
      </p>
      <p className="text-gray-600">
        Quiz dibuka: {formatDateTime(quiz.timeStart)}
      </p>
      <p className="text-gray-600">Tenggat: {formatDateTime(quiz.timeEnd)}</p>
      <p className="text-gray-600 mt-2">Deskripsi: {quiz.description}</p>
      <div className="flex gap-2">
        <Button
          onClick={() => navigate(`/quiz/view/${quiz.quizId}`)}
          className={
            "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          }
        >
          <Eye size={16} />
        </Button>
        <Button
          onClick={() => navigate(`/quiz/edit/${quiz.quizId}`)}
          className={
            "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          }
        >
          <FilePenLine size={16} />
        </Button>
        <Button
          onClick={() => handleDelete(quiz.quizId)}
          className={
            "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          }
        >
          <Trash2 size={16} />
        </Button>
        <Button
          onClick={() => navigate(`/leaderboard/${quiz.quizId}`)}
          className={
            "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
          }
        >
          <ChartNoAxesColumnIncreasing size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CardQuizTeacher;
