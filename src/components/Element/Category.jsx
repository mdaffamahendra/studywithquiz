import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Button from "../Element/Button";
import { useNavigate } from "react-router-dom";
import CardBook from "./CardBook";
import { fetchCategoryData } from "../../services/books-api";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { getData } from "../../fetch";

const Field = React.memo(({ field }) => {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const token = useSelector((state) => state.users.token);

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
    <div ref={observerRef} className="category w-full mb-12">
      {data && <h2 className="text-xl font-bold text-blue-700">{category}</h2>}
      {data && data.length === 0 && <p>No books found for this category.</p>}
      <div className="relative w-full">
        <div
          ref={scrollContainer}
          className="flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide"
          onScroll={handleScroll}
        >
          {data &&
            data.map((mod, index) => (
              <div key={`${mod._id}-${index}`}>
                <div
                  key={mod.id}
                  className="bg-white p-4 shadow rounded-lg border-l-4 border-indigo-600"
                >
                  <h2 className="text-lg font-semibold text-indigo-700">
                    {mod.title}
                  </h2>
                  <Button
                    onClick={() => navigate(`/module/${mod._id}`)}
                    className={
                      "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                    }
                  >
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
            ))}
        </div>

        {!isAtStart && data && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10"
          >
            ❮
          </button>
        )}

        {!isAtEnd && data && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-full z-10"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
});

const LibraryMain = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Debouncing input
  const debouncedSearch = useRef(
    debounce((value) => setQuery(value), 300)
  ).current;

  const handleInputChange = (e) => {
    debouncedSearch(e.target.value);
  };
  

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const fields = ["Informatika", "Matematika"];

  return (
    <div className="flex-1 p-6 w-full h-screen overflow-y-auto">
      <div className="mb-4 flex flex-col lg:flex-row justify-between items-center w-full mb-24">
        <header className="text-blue-500 py-4 px-6 w-full lg:w-auto">
          <h1 className="text-3xl font-bold text-center lg:text-left text-blue-500">
            UsLibrary
          </h1>
          <p className="text-sm text-center lg:text-left">
            Temukan buku favorit Anda!
          </p>
        </header>

        <div className="flex items-center w-full lg:w-auto rounded-lg p-2">
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Enter book title"
            className="p-2 border border-gray-300 rounded mr-2 flex-grow w-full lg:w-auto"
          />
          <Button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Search
          </Button>
        </div>
      </div>
      {fields.map((field, index) => (
        <Field key={`${field}-${index}`} field={field} />
      ))}
    </div>
  );
};

export default LibraryMain;
