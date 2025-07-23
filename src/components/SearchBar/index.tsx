import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.trim().length >= 3) {
      onSearch(e.target.value.trim());
    }
  };

  return (
    <div
      className="flex items-center w-full max-w-md mx-auto"
      style={{ background: "var(--surface)" }}
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={() => onSearch(query.trim())}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
