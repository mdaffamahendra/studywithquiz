import React from "react";
import Input from "../Element/Input";
import Button from "../Element/Button";

const QuizStart = ({
  currentQuestionIndex,
  questions,
  question,
  answers,
  setFinished,
  selectedAnswer,
  handlePrev,
  handleNext,
  setSearchParams,
  handleAnswerSelect,
}) => {
  return (
    <div className="flex w-full max-w-4xl">
      <div className="w-3/4 bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg font-bold mb-4">
          {currentQuestionIndex}. {question.question}
        </p>
        {question.image && (
          <img
            src={question.image}
            alt="Question"
            className="w-60 h-40 object-cover rounded-md mb-2"
          />
        )}
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-2 p-3 rounded-lg cursor-pointer font-semibold text-indigo-600"
            >
              <Input
                type="radio"
                name={`answer-${currentQuestionIndex - 1}`}
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleAnswerSelect(option)}
                className="w-5 h-5"
              />
              {option}
            </label>
          ))}
        </div>

        <div
          className={`flex mt-4 ${
            currentQuestionIndex > 1 ? "justify-between" : "justify-end"
          }`}
        >
          {currentQuestionIndex < questions.length ? (
            <>
              {currentQuestionIndex > 1 && (
                <Button
                  onClick={handlePrev}
                  className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-semibold"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-semibold"
              >
                Next
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setFinished(true)}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white font-semibold"
            >
              Finish
            </Button>
          )}
        </div>
      </div>

      <div className="w-1/4 flex flex-col items-center bg-white text-indigo-600 p-4 rounded-lg ml-4">
        <h3 className="text-lg font-bold mb-2">Navigation</h3>
        <div className="grid grid-cols-4 gap-4">
          {questions.map((_, index) => (
            <Button
              key={index}
              onClick={() => setSearchParams({ "next-question": index + 1 })}
              className={`w-8 h-8 text-white rounded-full ${
                answers[index]
                  ? "bg-indigo-600"
                  : "bg-gray-600 hover:bg-gray-500"
              } ${
                currentQuestionIndex === index + 1
                  ? `bg-indigo-900`
                  : `bg-gray-600`
              }`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizStart;
