import React from "react";
import { useNavigate } from "react-router-dom";
import FormJoinQuiz from "./FormJoinQuiz";
import Button from "../Element/Button";
import QuizField from "./QuizField";


const JoinQuiz = () => {
  const navigate = useNavigate();
  const fields = ["Informatika", "Matematika", "Bahasa", "MIPA", "Seni Budaya", "Olahraga"];
  return (
    <div className="min-h-screen text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Join a Quiz</h1>
          <Button
            onClick={() => navigate("/")}
            className="text-gray-200 hover:text-white"
          >
            ← Back to Home
          </Button>
        </div>

        <div className="mb-8 flex items-center justify-center">
          <FormJoinQuiz />
        </div>

        <div className="space-y-8">
          {fields.map((field, index) => (
            <QuizField key={`${field}-${index}`} field={field} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;
