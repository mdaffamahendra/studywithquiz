import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "../redux/slice/QuizSlice";
import Swal from "sweetalert2";
import PageLayout from "../components/Layout/PageLayout";
import FormQuiz from "../components/Fragment/FormQuiz";

const QuizAddPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    quizId: "",
    title: "",
    description: "",
    field: "ya",
    timeStart: "",
    timeEnd: "",
    timer: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(addQuiz({ url: "quiz/add", newQuiz: formData, token }))
        .unwrap()
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: res.message,
            scrollbarPadding: false,
          });
        });
      navigate(-1);
    } catch (error) {
      setError(error.message);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="justify-center items-center min-h-screen font-poppins px-6 py-24">
        <FormQuiz
          use={"add"}
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

export default QuizAddPage;
