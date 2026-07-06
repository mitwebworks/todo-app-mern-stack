import React, { useEffect, useState } from "react";
import axios from "axios";
import ToDoItem from "./components/ToDoItem";
import { ToDoProvider } from "./contexts/ToDoContext";
import ToDoForm from "./components/ToDoForm";
import api from "./api";
import SearchForm from "./components/SearchForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    setError(null);
    api
      .get("/tasks")
      .then((res) => setTodos(res.data.data))
      .catch((err) => {
        setError(err.message);
        console.error("Error: ", err);
      })
      .finally(() => setTimeout(() => setLoading(false), 400));
  }, []);

  // search todos
  const searchItem = async (label) => {
    setError(null);
    if (!label || label == "") {
      try {
        const res = await api.get("/tasks");
        setTodos(res.data.data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
      return;
    }

    try {
      const res = await api.get("/tasks/search/" + label);
      setTodos(res.data.data);

      if (res.data.data.length == 0) {
        setError(`No matching result found for '${label}'`);
      }

    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Add new Task
  const addItem = async (label) => {
    setError(null);
    if (!label || label == "") return;

    try {
      const res = await api.post("/tasks", {
        task: label,
        isCompleted: false,
      });
      setTodos([res.data.data, ...todos]);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Update task
  const updateItem = async (id, label) => {
    setError(null);
    try {
      const res = await api.put(`/tasks/${id}`, {
        task: label,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, task: res.data.task } : todo,
        ),
      );
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }

    // setTodos((prev) =>
    //   prev.map((todo) => (todo.id === id ? { ...todo, label: label } : todo)),
    // );
  };

  // Remove task
  const removeItem = async (id) => {
    setError(null);
    try {
      const res = await api.delete(`/tasks/${id}`);
      setTodos((prev) => prev.filter((each) => each._id !== id));
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  // Mark completion
  const toggleComplete = async (id) => {
    setError(null);
    const currentStatus = todos.find((todo) => todo._id === id)?.isCompleted;
    let newStatus = currentStatus === true ? false : true;

    try {
      const res = await api.patch(`/tasks/${id}`, {
        isCompleted: newStatus,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id
            ? todo.isCompleted == false
              ? { ...todo, isCompleted: true }
              : { ...todo, isCompleted: false }
            : todo,
        ),
      );
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  };

  return (
    <ToDoProvider
      value={{
        todos,
        addItem,
        updateItem,
        removeItem,
        toggleComplete,
        searchItem,
      }}
    >
      <div className="bg-zinc-800 h-screen w-full overflow-y-scroll fixed inset-0 p-10">
        <div className="max-w-xl mx-auto my-20 flex flex-col gap-10">
          <h1 className="text-center text-4xl font-bold text-white">
            ToDo List App
          </h1>
          <ToDoForm />
          <SearchForm />
          {error && (
            <div className="bg-red-200 text-red-500 font-medium text-sm border border-red-500 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!loading ? (
              todos.map((todo) => <ToDoItem key={todo._id} todo={todo} />)
            ) : (
              <p className="bg-white p-5 text-lg font-medium text-center rounded-lg animate-pulse">
                Loading data...
              </p>
            )}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
