import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../components/Element/InputForm";
import TextareaForm from "../components/Element/TextareaForm";
import Input from "../components/Element/Input";
import Button from "../components/Element/Button";
import Swal from "sweetalert2";
import { addQuestion } from "../redux/slice/QuestionSlice";
import PageLayout from "../components/Layout/PageLayout";

const AddQuestion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const quizId = searchParams.get("quizId");
  const token = useSelector((state) => state.users.token);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    image: null,
    score: 0,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const validateOptions = (options) => {
    const nonEmptyOptions = options.filter((opt) => opt.trim() !== ""); // Hapus opsi kosong
    const uniqueOptions = new Set(nonEmptyOptions); // Buat Set dari array opsi
    return uniqueOptions.size === nonEmptyOptions.length; // Bandingkan ukuran Set dengan panjang array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validasi opsi
    if (!validateOptions(formData.options)) {
      setLoading(false);
      setError("Setiap opsi jawaban harus berbeda!");
      return;
    }

    const questionData = new FormData();
    questionData.append("quizId", quizId);
    questionData.append("question", formData.question);
    questionData.append("options", JSON.stringify(formData.options));
    questionData.append("correctAnswer", formData.correctAnswer);
    questionData.append("score", formData.score);
    if (formData.image) {
      questionData.append("image", formData.image);
    }

    try {
      await dispatch(
        addQuestion({ url: `question/add`, newQuestion: questionData, token })
      )
        .unwrap()
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            scrollbarPadding: false,
          });
          navigate(`/quiz/view/${quizId}`);
          console.log(response);
        });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        scrollbarPadding: false,
      });
    }
  }, [error]);

  return (
    <PageLayout>
      <div className="justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900 min-h-screen font-poppins px-6 py-24">
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white text-indigo-600 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Add Question</h1>

          <form onSubmit={handleSubmit} className="space-y-4 font-bold">
            <InputForm
              type={"text"}
              name={"quizId"}
              placeholder={"ex: 11111 (Quiz Id must have 5 digits"}
              value={quizId}
              readOnly={true}
            >
              ID Quiz
            </InputForm>

            {/* Question */}
            <TextareaForm
              name={"question"}
              placeholder={"Masukan pertanyaan..."}
              value={formData.question}
              onChange={handleChange}
            >
              Question
            </TextareaForm>

            {/* Image Upload */}
            <InputForm
              type={"file"}
              id={"file"}
              accept={"image/*"}
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
                type={"text"}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}

            <InputForm
              type={"text"}
              name={"correctAnswer"}
              placeholder={"Correct Answer"}
              value={formData.correctAnswer}
              onChange={handleChange}
            >
              Jawaban Benar (Masukan jawaban benar sesuai seperti yang ada di
              option)
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

            <Button type={"submit"} disabled={loading}>
              {loading ? "Saving..." : "Add Question"}
            </Button>
          </form>

          <Button
            onClick={() => navigate(-1)}
            className={
              "w-full mt-4 p-2 bg-gray-200 text-indigo-600 border-1 border-indigo-600 hover:bg-gray-400 rounded"
            }
          >
            Back
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddQuestion;
