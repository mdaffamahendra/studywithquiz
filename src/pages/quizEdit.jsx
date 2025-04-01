import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { editQuiz, fetchQuizById } from "../redux/slice/QuizSlice";
import PageLayout from "../components/Layout/PageLayout";
import FormQuiz from "../components/Fragment/FormQuiz";

const QuizEditPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const token = useSelector((state) => state.users.token);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    quizId: "",
    title: "",
    description: "",
    field: "",
    timeStart: "",
    timeEnd: "",
    timer: 0,
  });

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchQuizAPI = async () => {
      try {
        const quizData = await dispatch(
          fetchQuizById({ url: `quiz/${quizId}`, token })
        ).unwrap();
        setFormData({
          quizId: quizData.quizId || "",
          title: quizData.title || "",
          description: quizData.description || "",
          field: quizData.field || "Matematika",
          timeStart: quizData.timeStart
            ? new Date(quizData.timeStart).toISOString().slice(0, 16)
            : "",
          timeEnd: quizData.timeEnd
            ? new Date(quizData.timeEnd).toISOString().slice(0, 16)
            : "",
          timer: quizData.timer || 0,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Failed to fetch quiz",
          scrollbarPadding: false,
        });
        navigate("/quiz");
        throw new Error(error)
      }
    };

    fetchQuizAPI();
  }, [quizId, token, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(
        editQuiz({ url: `quiz/edit/${quizId}`, updatedQuiz: formData, token })
      ).unwrap().then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: res.message,
          scrollbarPadding: false,
        });
        navigate(-1)}
      );
    } catch (error) {
      setError(error.message)
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
    <div className="justify-center items-center min-h-screen font-poppins px-6 py-24">
      <FormQuiz
        use={"edit"}
        error={error}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        loading={loading}
      />
    </div>
  </PageLayout>
  );
};

export default QuizEditPage;
