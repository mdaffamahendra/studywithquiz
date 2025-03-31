import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Eye } from "lucide-react";
import Button from "../Element/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from "../../fetch";

const FieldModule = React.memo(({ field }) => {
    const [isVisible, setIsVisible] = useState(false);
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
  
  
    return (
      <div ref={observerRef} className="w-full my-12 pr-10 pl-8">
        {data && <h2 className="text-xl font-bold text-white my-2">{field}</h2>}
        {isLoading && <p className="text-white">Loading...</p>}
        {isError && <p className="text-white">Error loading modules</p>}
        {data && data.length === 0 && (
          <p className="text-white">No modules found for this field.</p>
        )}
        <div className="w-full">
          <div
            className="flex flex-wrap items-center justify-start gap-2 py-2 pb-3"
          >
            {data &&
              data.map((mod) => (
                <div
                  key={mod._id}
                  className="bg-white shadow rounded-lg border border-indigo-600 bg-white shadow-lg px-6 py-8 rounded-lg w-96 flex flex-col justify-between items-start flex-shrink-0"
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
  
        </div>
      </div>
    );
  });

export default FieldModule
