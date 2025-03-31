import React from 'react'
import { useSelector } from "react-redux";
import { Eye } from "lucide-react";
import Button from "../Element/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getData } from '../../fetch';


const SearchResultsModule = ({ query }) => {
    const token = useSelector((state) => state.users.token);
    const navigate = useNavigate();
  
    const fetchSearchResults = async () => {
      try {
        const response = await getData(`materi?title=${query}`, token);
        return response;
      } catch (error) {
        throw error.message;
      }
    };
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ["search", query],
      queryFn: fetchSearchResults,
      enabled: !!query,
    });
  
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-4">
          Pencarian Anda: "{query}"
        </h2>
        {isLoading && <p className="text-white">Loading search results...</p>}
        {isError && <p className="text-white">Error loading search results</p>}
        {data && data.length === 0 && (
          <p className="text-white">No modules found for your search query.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data &&
            data.map((mod) => (
              <div
                key={mod._id}
                className="bg-white p-4 shadow rounded-lg border border-indigo-600 bg-white shadow-lg px-6 py-8 rounded-lg"
              >
                <h2 className="text-lg font-semibold text-indigo-600">
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
            ))}
        </div>
      </div>
    );
  };
export default SearchResultsModule
