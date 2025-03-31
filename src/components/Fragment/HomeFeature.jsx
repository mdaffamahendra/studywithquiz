import React from "react";

const HomeFeature = ({benefits}) => {
  return (
    <div className="bg-gray-100 text-indigo-600 py-16 px-6 flex flex-col lg:flex-row items-center justify-center gap-12">
      <div className="max-w-lg">
        <h2 className="text-xl md:text-3xl font-bold mb-4">
          Apa itu StudyWithQuiz?
        </h2>
        <p className="mb-6 text-sm md:text:md text-gray-700">
          StudyWithQuiz adalah platform pembelajaran berbasis kuis yang
          dirancang untuk membantu siswa menguji pemahaman mereka melalui
          pengalaman belajar yang interaktif.
        </p>
        <h3 className="text-xl md:text-2xl font-semibold mb-4">
          Keunggulan Metode Quiz:
        </h3>
        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li
              className="flex items-center gap-3 text-sm md:text-md"
              key={index}
            >
              {benefit.icon} {benefit.text}
            </li>
          ))}
        </ul>
      </div>
      {/* Bagian Kanan: Tempat Gambar */}
      <div className="max-w-md w-full">
        <img
          src="https://cdn.pixabay.com/photo/2025/01/31/02/43/ai-generated-9371381_1280.jpg"
          alt="Quiz Illustration"
          className="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default HomeFeature;
