import React, { useContext, useState } from "react";
import { ToDoContext } from "../contexts";

const ToDoItem = ({ todo }) => {
  const { updateItem, removeItem, toggleComplete } = useContext(ToDoContext);

  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.task);

  const editTodo = () => {
    updateItem(todo._id, todoMsg);
    // setTodo(todoMsg);
  };

  const toggleCompleted = () => {
    toggleComplete(todo._id);
  };

  const deleteTodo = () => {
    removeItem(todo._id);
  };

  return (
    <div
      className={`flex gap-2 items-center p-2 border border-zinc-50 ${todo.isCompleted ? "bg-green-200" : "bg-white"} rounded-md`}
    >
      <div className="flex gap-3 items-center text-xl w-full">
        <input
          type="checkbox"
          className="size-7 border border-red-300 cursor-pointer"
          onChange={toggleCompleted}
          defaultChecked={todo.isCompleted}
        />
        <input
          type="text"
          className={`w-full ${todo.isCompleted ? "line-through" : ""} ${isEditable ? "bg-zinc-200" : "" } `}
          readOnly={!isEditable}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          autoFocus={isEditable}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="size-10 flex justify-center items-center border disabled:opacity-50 disabled:cursor-not-allowed border-zinc-300 bg-white rounded-md shadow cursor-pointer"
          onClick={() => {
            if (todo.isCompleted) return;
            if (isEditable) {
              setIsEditable(false);
              editTodo();
            } else {
              setIsEditable(true);
            }
          }}
          disabled={todo.isCompleted}
        >
          {isEditable ? "📁" : "✏"}
        </button>
        <button
          className="size-10 flex justify-center items-center border border-zinc-300 bg-white rounded-md shadow cursor-pointer"
          onClick={deleteTodo}
        >
          ❌
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
