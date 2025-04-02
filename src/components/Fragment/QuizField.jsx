import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { formatDateTime, getData } from "../../fetch";
import CardQuizStudent from "../Element/CardQuizStudent";
import Button from "../Element/Button";

const QuizField = React.memo(({ field }) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const token = useSelector((state) => state.users.token);

  const getQuizByField = async () => {
    try {
      const response = await getData(`quiz?field=${field}`, token);
      return response;
    } catch (error) {
      throw error.message;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizzes", field],
    queryFn: getQuizByField,
    enabled: isVisible,
  });

  const scrollContainer = useRef(null);

  const handleScroll = () => {
    const container = scrollContainer.current;
    if (container) {
      setIsAtStart(container.scrollLeft === 0);
      setIsAtEnd(
        container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 1
      );
    }
  };

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div ref={observerRef} className="w-full mb-12">
      {isLoading ? <p className="text-white">Loading quizzes...</p> :  <h2 className="text-xl font-bold text-white my-4">{field}</h2>}
      {isError && <p className="text-red-300">Error loading quizzes</p>}
      {data && data.length === 0 && (
        <p className="text-white">No quizzes found for this category.</p>
      )}

      <div className="relative">
        <div
          ref={scrollContainer}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2"
        >
          {data?.map((quiz, index) => (
            <CardQuizStudent
              key={`${quiz.quizId}-${index}`}
              quiz={quiz}
              formatDateTime={formatDateTime}
            />
          ))}
        </div>

        {!isAtStart && data?.length > 0 && (
          <Button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10 hover:bg-gray-700"
          >
            ❮
          </Button>
        )}

        {!isAtEnd && data?.length > 0 && (
          <Button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10 hover:bg-gray-700"
          >
            ❯
          </Button>
        )}
      </div>
    </div>
  );
});

export default QuizField;
