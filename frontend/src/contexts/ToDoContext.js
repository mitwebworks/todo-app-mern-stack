import React, { useContext } from "react";
import { createContext } from "react";

const ToDoContext = createContext({
  items: [
    {
      id: 1,
      label: "Wash cloths in the moring",
      completed: false,
    },
  ],
  addItem: (label) => {},
  updateItem: (id, label) => {},
  removeItem: (id) => {},
  toggleComplete: (id) => {},
});

// const useToDo = useContext(ToDoContext);

const ToDoProvider = ToDoContext.Provider;

export { ToDoContext, ToDoProvider };
