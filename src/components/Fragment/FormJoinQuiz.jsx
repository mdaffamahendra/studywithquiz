import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../Element/InputForm";
import Button from "../Element/Button";
import { fetchQuizById } from "../../redux/slice/QuizSlice";
import { useDispatch, useSelector } from "react-redux";
import Form from "../Element/Form";

const FormJoinQuiz = () => {
  const [quizId, setQuizId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!/^\d{5}$/.test(quizId)) {
      setError("Quiz ID harus berupa 5 digit angka!");
      return;
    }
    try {
      await dispatch(fetchQuizById({ url: `quiz/${quizId}`, token }))
        .unwrap()
        .then((res) => {
          if (new Date(res.timeEnd) < new Date()) {
            setError("Maaf, quiz sudah tidak berlaku");
            return;
          }
          if (new Date(res.timeStart) > new Date()) {
            setError("Maaf, quiz belum dibuka");
            return;
          }
          navigate(`/quiz/in/${quizId}?next-question=1`);
        });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuizId(e.target.value);
    setError("");
  };

  return (
    <Form
      handler={handleSubmit}
      style={"bg-white text-indigo-600 p-6 rounded-lg shadow-md w-80"}
    >
      <InputForm
        type={"text"}
        name={"quizId"}
        value={quizId}
        onChange={(e) => handleChange(e)}
        max={"5"}
        min={"5"}
        placeholder={"Enter 5-digit Quiz ID"}
      ></InputForm>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

      <Button
        type={"submit"}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-semibold"
      >
        {loading ? "Loading...." : "Join Quiz"}
      </Button>
    </Form>
  );
};

export default FormJoinQuiz;
