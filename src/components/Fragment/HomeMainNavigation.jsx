import React from 'react'
import { Link } from 'react-router-dom'

const HomeMainNavigation = ({role}) => {
  return (
    <>
      <p className="text-center text-sm md:text-xl max-w-lg">
        {role === "student"
          ? "Test your knowledge and challenge your friends!"
          : "Create quiz for your students!"}
      </p>
      <div className="flex gap-4">
        {role === undefined || role === null ? (
          <div>Loading...</div>
        ) : role === "student" ? (
          <Link
            to="/join-quiz"
            className="bg-indigo-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg"
          >
            Join Quiz
          </Link>
        ) : (
          <Link
            to="/quiz"
            className="bg-indigo-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg"
          >
            Create Quiz
          </Link>
        )}
      </div>
    </>
  )
}

export default HomeMainNavigation
