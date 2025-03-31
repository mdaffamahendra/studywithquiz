import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDateTime, formatTime, getData } from "../fetch";
import { useSelector } from "react-redux";
import PageLayout from "../components/Layout/PageLayout";
import Input from "../components/Element/Input";
import ResultInformation from "../components/Fragment/ResultInformation";
import ResultQuestion from "../components/Fragment/ResultQuestion";
import LoadingElement from "../components/Element/LoadingElement";

const QuizResult = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.users.token);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const fetchQuizResult = async () => {
      if (!user) return navigate("/");
      try {
        await getData(`result-quiz/${id}`, token).then((data) => {
          setQuizData(data.quizResult);
        });
      } catch (error) {
        console.error("Error fetching quiz result:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResult();
  }, [id]);

  if (loading) {
    return <LoadingElement />;
  }
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto text-white py-24 px-2">
        <ResultInformation
          quizData={quizData}
          formatDateTime={formatDateTime}
          formatTime={formatTime}
        />

        <ResultQuestion quizData={quizData} />
      </div>
    </PageLayout>
  );
};

export default QuizResult;
