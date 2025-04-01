import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/Element/Button";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Element/Navbar";
import Swal from "sweetalert2";
import { deleteQuestion, getQuestion } from "../redux/slice/QuestionSlice";
import PageLayout from "../components/Layout/PageLayout";

const QuestionPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { questions } = useSelector((state) => state.question);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.users.token);
  const username = useSelector((state) => state.users.user.username);
  const role = useSelector((state) => state.users.user.role);
  const hasFetched = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchQuestions = async () => {
      try {
        await dispatch(
          getQuestion({ url: `question/${quizId}`, token })
        ).unwrap();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          scrollbarPadding: false,
        });
        navigate("/quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId, token, navigate]);

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
            deleteQuestion({ url: `question/delete/${id}`, token })
          )
            .unwrap()
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: response.message,
                scrollbarPadding: false,
              });
            });
          await dispatch(
            getQuestion({ url: `question/${quizId}`, token })
          ).unwrap();
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
  const handleAddQuestion = () => {
    const params = new URLSearchParams({ quizId: quizId });
    navigate(`/question/add?${params}`);
  };

  const handleEdit = (id) => {
    const params = new URLSearchParams({ id: id, quizId: quizId });
    navigate(`/question/edit?${params}`);
  };

  return (
    <PageLayout>
      <div className="justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900 min-h-screen font-poppins px-6 py-32">
        <div className="max-w-4xl mx-auto py-6 text-white">
          <h1 className="text-2xl font-bold mb-4">Daftar Pertanyaan</h1>

          {questions?.length > 0 && (
            <>
              <p>ID Quiz: {questions[0].quizId}</p>
              <p>Dibuat oleh: {username}</p>
              <p>Jumlah Pertanyaan: {questions.length}</p>
              <Button
                onClick={handleAddQuestion}
                className="my-2 mx-1 bg-white text-indigo-600 px-4 py-2 rounded-lg"
              >
                + Add Question
              </Button>
            </>
          )}
          <Button
            onClick={() => navigate("/quiz")}
            className={"my-2 bg-white text-indigo-600 px-4 py-2 rounded-lg"}
          >
            Back
          </Button>

          {loading ? (
            <p className="text-center">Loading questions...</p>
          ) : questions?.length === 0 ? (
            <div className="text-center mx-auto mt-8">
              <p className="text-center">No questions available.</p>
              <Button
                onClick={handleAddQuestion}
                className="my-2 bg-white text-indigo-600 px-4 py-2 rounded-lg"
              >
                + Add Question
              </Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {questions?.map((q, index) => (
                <div
                  key={q._id}
                  className="bg-indigo-600 shadow-md p-4 rounded-lg"
                >
                  {q.image && (
                    <img
                      src={q.image}
                      alt="Question"
                      className="w-60 h-40 object-cover rounded-md mb-2"
                    />
                  )}
                  <h2 className="text-lg font-semibold">
                    {index + 1}. {q.question}
                  </h2>
                  <ul className="mt-2">
                    {q.options.map((option, index) => (
                      <li
                        key={index}
                        className={`p-2 mb-2 rounded-md  ${
                          option === q.correctAnswer
                            ? "bg-green-700 font-bold"
                            : "bg-red-700"
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(q._id)}
                      className="bg-yellow-500 w-18 h-12 px-2 py-3 text-white mt-3 rounded-md"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(q._id)}
                      className="bg-red-500 px-2 py-3 text-white mt-3 rounded-md"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuestionPage;
