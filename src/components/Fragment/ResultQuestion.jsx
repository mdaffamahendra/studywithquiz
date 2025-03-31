import React from "react";
import Input from "../Element/Input";

const ResultQuestion = ({quizData}) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Review Quiz</h2>
      <div className="space-y-4">
        {quizData.answers.map((answer, index) => (
          <div
            key={index}
            className="bg-white text-indigo-600 p-6 rounded-xl shadow-md"
          >
            <p className="font-semibold text-sm md:text-md">
              {index + 1}. {answer.questionId.question}
            </p>
            {answer.questionId.image && (
              <img
                src={answer.questionId.image}
                alt="Question"
                className="w-60 h-40 object-cover rounded-md mb-2"
              />
            )}
            <div className="mt-2 space-y-1">
              {answer.questionId.options.map((option, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer font-semibold text-indigo-600 text-sm md:text-md ${
                    option === answer.questionId.correctAnswer
                      ? "bg-green-200"
                      : ""
                  } ${
                    option === answer.selectedOption &&
                    answer.questionId.correctAnswer !== answer.selectedOption
                      ? "bg-red-200"
                      : ""
                  }`}
                >
                  <Input
                    type="radio"
                    readOnly={true}
                    value={option}
                    checked={answer.selectedOption === option}
                    className={`w-5 h-5 `}
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className="flex flex-col">
              <p
                className={`mt-2 text-sm md:text-md inline-block p-2 rounded-md ${
                  answer.selectedOption === answer.questionId.correctAnswer
                    ? "bg-green-200"
                    : "bg-red-200"
                }`}
              >
                <strong>Your Answer:</strong> {answer.selectedOption}
              </p>
              <p className="mt-2 text-sm md:text-md inline-block p-2 rounded-md bg-green-200">
                <strong>Correct Answer:</strong>{" "}
                {answer.questionId.correctAnswer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultQuestion;
