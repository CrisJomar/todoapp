import React, { useState } from "react";
import { API_URL } from "../config"; // Import the centralized API URL
import axios from "axios";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo = { title, completed: false };
      axios.post(`${API_URL}/todos/`, newTodo).then((response) => {
        addTodo(response.data);
      });
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
