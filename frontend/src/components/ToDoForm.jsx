import React, { useContext, useState } from "react";
import { ToDoContext } from "../contexts/ToDoContext";

export default function ToDoForm() {
  const { addItem } = useContext(ToDoContext);
  const [todoItem, setTodoItem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(todoItem);
    setTodoItem("");
  };

  return (
    <form
      className="flex bg-white hover:bg-zinc-100 duration-200 rounded-4xl p-1 "
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="Enter Your ToDo"
        className="py-3 px-7 w-full outline-0 text-lg"
        id="formInput"
        value={todoItem}
        autoComplete="off"
        onChange={(e) => setTodoItem(e.target.value)}
      />
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg px-7 py-3 rounded-4xl cursor-pointer active:scale-95 duration-150">
        Add
      </button>
    </form>
  );
}
