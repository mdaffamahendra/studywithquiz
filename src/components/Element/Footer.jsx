import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white py-8 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-3">StudyWithQuiz</h2>
        <nav className="flex justify-center space-x-6 text-sm mb-4">
          <Link to="join-quiz" className="hover:underline">
            Join Quiz
          </Link>
          <Link to="/features" className="hover:underline">
            Fitur
          </Link>
          <Link to="/contact" className="hover:underline">
            Kontak
          </Link>
        </nav>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} StudyWithQuiz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
