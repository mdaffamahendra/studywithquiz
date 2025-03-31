import React from "react";

const SideAuth = ({ type }) => {
  return (
    <div className="md:w-1/2 w-full flex-col justify-center p-8 bg-indigo-600 text-white hidden md:block md:flex">
      <h1 className="text-4xl mb-5 font-bold">
        {type === "Sign In" ? "Welcome!" : "Ayo Daftar!"}
      </h1>
      <p className="text-md">
        {type === "Sign In"
          ? "QuizWithStudy siap menemani belajarmu dengan metode quiz"
          : "Daftarkan dirimu dan mulai belajar dengan metode quiz"}
      </p>
    </div>
  );
};

export default SideAuth;
