import React from "react";

const HomeMainContent = ({ username }) => {
  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold text-center">Hello, {username}</h1>
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        Selamat datang di StudyWithQuiz
      </h1>
      <p className="text-center text-sm md:text-xl max-w-lg">
        “Pengetahuan adalah investasi terbaik yang dapat kamu miliki, karena ia
        akan selalu memberikan hasil.” <i>(Imam Bukhari)</i>
      </p>
    </>
  );
};

export default HomeMainContent;
