import React, { useContext, useState } from "react";
import { ToDoContext } from "../contexts/ToDoContext";
import { useEffect } from "react";

export default function SearchForm() {
  const { searchItem } = useContext(ToDoContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    searchItem(query);
  }, [query]);

  return (
    <form
      className="flex bg-white hover:bg-zinc-100 duration-200 rounded-xl p-1 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="Search todo list"
        className="py-2 px-7 w-full outline-0 text-lg"
        id="formInput"
        value={query}
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {/* <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg px-7 py-3 rounded-4xl cursor-pointer active:scale-95 duration-150">
        Search
      </button> */}
    </form>
  );
}
