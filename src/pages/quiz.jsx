import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Element/Button";
import { formatDateTime } from "../fetch";
import Swal from "sweetalert2";
import { deleteQuiz, fetchQuizzes } from "../redux/slice/QuizSlice";
import PageLayout from "../components/Layout/PageLayout";
import CardQuizTeacher from "../components/Element/CardQuizTeacher";

const QuizPage = () => {
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.quiz);
  const quizzes = quiz?.quizzes;
  const username = useSelector((state) => state.users.user.username);
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(
            deleteQuiz({ url: `/quiz/delete/${id}`, token })
          ).unwrap();
          await dispatch(fetchQuizzes({ url: `quiz`, token })).unwrap();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Quiz has been deleted!",
            scrollbarPadding: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            scrollbarPadding: false,
          });
        }
      }
    });
  };

  useEffect(() => {
    const fetchQuizAPI = async () => {
      try {
        await dispatch(fetchQuizzes({ url: `quiz`, token })).unwrap();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Failed to fetch quiz",
          scrollbarPadding: false,
        });
      }
    };

    fetchQuizAPI();
  }, [dispatch, token]);

  return (
    <PageLayout>
      <div className="justify-center items-center min-h-screen font-poppins px-6 py-32">
        <div className="text-white">
          <p className="text-md md:text-xl mb-2">Hello, {username}</p>
          <p className="text-2xl font-poppins font-bold">
            {quizzes.length > 0
              ? `Kamu sudah membuat ${quizzes.length} quiz`
              : `Anda belum membuat quiz`}
          </p>
          <Button
            onClick={() => navigate("/quiz/add")}
            className="my-2 text-white bg-indigo-600 px-4 py-2 rounded-lg"
          >
            + Add Quiz
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {quizzes?.map((quiz, index) => (
            <CardQuizTeacher quiz={quiz} index={index} formatDateTime={formatDateTime} handleDelete={handleDelete}  />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizPage;
