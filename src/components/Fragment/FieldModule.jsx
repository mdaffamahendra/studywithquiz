import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Eye } from "lucide-react";
import Button from "../Element/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../fetch";

const FieldModule = React.memo(({ field }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const observerRef = useRef(null);
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  const fetchModuleByQuery = async (field) => {
    try {
      const response = await getData(`materi?field=${field}`, token);
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
    queryKey: ["field", field],
    queryFn: () => fetchModuleByQuery(field),
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
    <div ref={observerRef} className="w-full my-12">
      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <h2 className="text-xl font-bold text-white my-2">{field}</h2>
      )}
      {isError && <p className="text-white">Error loading modules</p>}
      {data && data.length === 0 && (
        <p className="text-white">No modules found for this field.</p>
      )}
      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide py-2"
          ref={scrollContainer}
          onScroll={handleScroll}
        >
          {data &&
            data.map((mod) => (
              <div
                key={mod._id}
                className="bg-white shadow-lg px-6 py-8 rounded-lg min-w-[300px] "
              >
                <h2 className="text-lg font-semibold text-indigo-600">
                  {mod.title}
                </h2>
                <p className="text-sm text-indigo-600">{mod.field}</p>
                <Button
                  onClick={() => navigate(`/module/${mod._id}`)}
                  className={
                    "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  }
                >
                  <Eye size={16} />
                </Button>
              </div>
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

export default FieldModule;
