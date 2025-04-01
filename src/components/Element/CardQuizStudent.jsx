import { FilePenLine } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Swal from "sweetalert2";

const CardQuizStudent = ({ quiz, formatDateTime }) => {
  const navigate = useNavigate();

  const handleJoinQuiz = ({ timeStart, timeEnd, quizId, title }) => {
    if (new Date(timeEnd) < new Date()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quiz sudah melewati masa tenggat",
        scrollbarPadding: false,
      });
      return;
    }

    if (new Date(timeStart) > new Date()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quiz belum dibuka",
        scrollbarPadding: false,
      });
      return;
    }

    Swal.fire({
      text: `Ingin mengerjakan ${title}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, ingin mengerjakan",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/quiz/in/${quizId}?next-question=1`);
      }
    });
  };

  return (
    <div className="bg-white shadow-lg px-6 py-8 rounded-lg min-w-[300px]">
      <h2 className="text-xl text-indigo-600 font-bold mb-2">{quiz.title}</h2>
      <p className="text-gray-600">ID Quiz: {quiz.quizId}</p>
      <p className="text-gray-600">
        Quiz dibuka: {formatDateTime(quiz.timeStart)}
      </p>
      <p className="text-gray-600">Tenggat: {formatDateTime(quiz.timeEnd)}</p>
      <p className="text-gray-600 mt-2">Deskripsi: {quiz.description}</p>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => handleJoinQuiz(quiz)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          <FilePenLine size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CardQuizStudent;
