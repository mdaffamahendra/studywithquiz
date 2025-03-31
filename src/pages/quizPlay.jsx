import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../redux/slice/QuestionSlice";
import Swal from "sweetalert2";
import { fetchQuizById } from "../redux/slice/QuizSlice";
import Timer from "../components/Element/Timer";
import { postData } from "../fetch";
import QuizStart from "../components/Fragment/QuizStart";
import QuizEnd from "../components/Fragment/QuizEnd";

const QuizPlayPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => state.question);
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuestionIndex = Number(searchParams.get("next-question")) || 1;

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(null);
  const [startQuiz, setStartQuiz] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchQuizAPI = async () => {
      try {
        const quizData = await dispatch(
          fetchQuizById({ url: `quiz/${quizId}`, token })
        ).unwrap();

        if (new Date(quizData.timeEnd) < new Date()) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Maaf, quiz sudah tidak berlaku",
          });
          navigate("/");
          return;
        }

        setTimer(quizData.timer);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Failed to fetch quiz",
        });
        navigate("/");
      }
    };

    fetchQuizAPI();
  }, [quizId, token, navigate, dispatch]);

  useEffect(() => {
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
        });
        navigate("/");
      }
    };
    fetchQuestions();
  }, [quizId, dispatch, token, navigate]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length) {
      setSearchParams({ "next-question": currentQuestionIndex + 1 });
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex !== 1) {
      setSearchParams({ "next-question": currentQuestionIndex - 1 });
    }
  };
  useEffect(() => {
    setSelectedAnswer(
      answers[currentQuestionIndex - 1]?.selectedOption || null
    );
  }, [currentQuestionIndex, answers]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    const updatedAnswers = [...answers];

    const currentQuestion = questions[currentQuestionIndex - 1];

    updatedAnswers[currentQuestionIndex - 1] = {
      questionId: currentQuestion._id, // ID soal
      question: currentQuestion.question,
      questionOption: currentQuestion.options,
      selectedOption: option,
      isCorrect: option === currentQuestion.correctAnswer, // Cek apakah jawaban benar
      score:
        option === currentQuestion.correctAnswer ? currentQuestion.score : 0, // Ambil skor jika benar, 0 jika salah
    };

    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const updatedAnswers = questions.map((q, index) => {
      const userAnswer = answers[index] || {
        questionId: q._id,
        question: q.question,
        questionOption: q.options,
        selectedOption: "Tidak Dijawab",
        isCorrect: false,
        score: 0,
      };

      return userAnswer;
    });

    setAnswers(updatedAnswers);
    setFinished(true);

    // Hasil akhir
    const result = {
      quizId,
      userId: user.id,
      startedAt: startQuiz,
      completedAt: new Date().toISOString(),
      answers: updatedAnswers,
    };

    await postData("submit-quiz", result, token)
      .then((res) => {
        navigate(`/result-quiz/${res.quizResult._id}`);
      })
      .catch((err) => console.log(err));
  };

  if (!questions.length) {
    return <div className="text-center text-white mt-20">Loading quiz...</div>;
  }

  const question = questions[currentQuestionIndex - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900 text-indigo-700">
      {timer !== null && (
        <Timer
          initialTime={timer * 60}
          onTimeUp={handleSubmit}
          isQuizFinished={finished}
          setDuration={setDuration}
          setStartQuiz={setStartQuiz}
        />
      )}

      {!finished ? (
        <QuizStart
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
          question={question}
          answers={answers}
          setFinished={setFinished}
          selectedAnswer={selectedAnswer}
          handleNext={handleNext}
          handlePrev={handlePrev}
          setSearchParams={setSearchParams}
          handleAnswerSelect={handleAnswerSelect}
        />
      ) : (
        <QuizEnd handleSubmit={handleSubmit} setFinished={setFinished}/>
      )}
    </div>
  );
};

export default QuizPlayPage;
