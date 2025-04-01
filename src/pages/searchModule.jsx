import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import Input from "../components/Element/Input";
import { debounce } from "lodash";
import FieldModule from "../components/Fragment/FieldModule";
import SearchResultsModule from "../components/Fragment/SearchResultsModule";
import PageLayout from "../components/Layout/PageLayout";

const SearchModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  const debouncedSearch = useRef(
    debounce((value) => setQuery(value), 300)
  ).current;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const fields = ["Matematika", "Informatika", "Bahasa", "MIPA", "Seni Budaya", "Olahraga"];

  return (
    <PageLayout>
      <div className="min-h-screen font-poppins px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-white">Search Module</h1>
          <p className="text-white mt-2">
            Find your learning modules quickly and easily.
          </p>
        </div>

        <div className="relative max-w-lg mx-auto mt-6">
          <Input
            type={"text"}
            placeholder={"Search for a module..."}
            className={
              "w-full px-4 py-3 border text-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            }
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Search className="absolute right-4 top-3 text-white" />
        </div>

        {query ? (
          <SearchResultsModule query={query} />
        ) : (
          <div className="space-y-8">
            {fields.map((field, index) => (
              <FieldModule key={`${field}-${index}`} field={field} />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default SearchModule;
