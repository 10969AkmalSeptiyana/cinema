import Router from "next/router";
import { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  const [field, setField] = useState({ searchField: "" });

  function createHandler(e) {
    e.preventDefault();

    Router.push(`/search/${field.searchField}`);
  }

  function fieldHandler(e) {
    setField({
      ...field,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="p-5 md:py-11 md:px-9" onSubmit={createHandler}>
      <label htmlFor="search-field" className="sr-only">
        Search all movies
      </label>
      <div className="flex items-center relative">
        <input
          type="search"
          name="searchField"
          id="search-field"
          autoComplete="off"
          placeholder="Search for movies, TV shows..."
          onChange={fieldHandler}
          className="text-[#E8E8E8] text-lg py-4 pl-20 pr-8 bg-[#1a171e] rounded-[30px] flex-1 outline-none"
        />
        <button type="submit" className="absolute left-8">
          <MagnifyingGlassIcon className="w-8 h-8 text-[#494a50]" />
        </button>
      </div>
    </form>
  );
}
