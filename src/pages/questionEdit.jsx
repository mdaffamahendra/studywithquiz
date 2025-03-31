import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Element/Navbar";
import InputForm from "../components/Element/InputForm";
import TextareaForm from "../components/Element/TextareaForm";
import Input from "../components/Element/Input";
import Button from "../components/Element/Button";
import Swal from "sweetalert2";
import { editQuestion, getQuestionById } from "../redux/slice/QuestionSlice";
import PageLayout from "../components/Layout/PageLayout";

const EditQuestion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const quizId = searchParams.get("quizId");
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    image: null,
    score: 0,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);

  // Fetch question data
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchQuestions = async () => {
      try {
        const response = await dispatch(
          getQuestionById({ url: `question/in/${id}`, formData, token })
        ).unwrap();
        setFormData((prevState) => ({
          ...prevState,
          question: response.question,
          options: response.options,
          correctAnswer: response.correctAnswer,
          score: response.score,
          image: response.image || null,
        }));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Failed to fetch question",
          scrollbarPadding: false,
        });
        navigate("/quiz");
      }
    };

    fetchQuestions();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const questionData = new FormData();
      questionData.append("quizId", quizId);
      questionData.append("question", formData.question);
      questionData.append("options", JSON.stringify(formData.options));
      questionData.append("correctAnswer", formData.correctAnswer);
      questionData.append("score", formData.score);
      if (formData.image) {
        questionData.append("image", formData.image);
      }
      await dispatch(
        editQuestion({
          url: `question/edit/${id}`,
          updatedQuestion: questionData,
          token,
        })
      )
        .unwrap()
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            scrollbarPadding: false,
          });
          navigate(-1);
        })
        .catch((error) => setError(error.response?.message || error.message));
    } catch (err) {
      setError(err.response?.message || "Failed to update question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error });
    }
  }, [error]);

  return (
    <PageLayout>
      <div className="justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900 min-h-screen font-poppins px-6 py-24">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white text-indigo-600 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Edit Question</h1>

          <form onSubmit={handleSubmit} className="space-y-4 font-bold">
            <InputForm type="text" name="quizId" value={quizId} readOnly={true}>
              ID Quiz
            </InputForm>

            {/* Question */}
            <TextareaForm
              name="question"
              placeholder="Masukan pertanyaan..."
              value={formData.question}
              onChange={handleChange}
            >
              Question
            </TextareaForm>

            {/* Image Upload */}
            <InputForm
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={false}
            >
              Upload Gambar (jika soal membutuhkan gambar)
            </InputForm>

            {/* Options */}
            <p className="text-sm font-medium text-gray-800">Options</p>
            {formData.options.map((option, index) => (
              <Input
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}

            {/* Correct Answer */}
            <InputForm
              type="text"
              name="correctAnswer"
              placeholder="Correct Answer"
              value={formData.correctAnswer}
              onChange={handleChange}
            >
              Jawaban Benar
            </InputForm>

            <InputForm
              type={"number"}
              name={"score"}
              placeholder={"Score Question"}
              value={formData.score}
              onChange={handleChange}
            >
              Besar nilai jawaban
            </InputForm>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Update Question"}
            </Button>
          </form>

          <Button
            onClick={() => navigate(-1)}
            className="w-full mt-4 p-2 bg-gray-200 text-indigo-600 border-1 border-indigo-600 hover:bg-gray-400 rounded"
          >
            Back
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditQuestion;
