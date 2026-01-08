import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // initial load
  useEffect(() => {
    axios
      .get(`${API_URL}/todos/`)
      .then((response) => setTodos(response.data))
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError("Failed to fetch todos");
      });
  }, []);

  // ADD
  const handleAddTodo = async () => {
    const title = input.trim();
    if (!title) return;

    try {
      const res = await axios.post(`${API_URL}/todos/`, {
        title,
        completed: false,
      });
      setTodos((prev) => [...prev, res.data]);
      setInput("");
      setError("");
    } catch (err) {
      console.error("Error adding todo:", err);
      setError("Failed to add todo");
    }
  };

  // ENTER key support
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  // TOGGLE COMPLETE
  const handleToggleTodo = async (todo) => {
    try {
      const res = await axios.put(`${API_URL}/todos/${todo.id}`, {
        title: todo.title,
        completed: !todo.completed,
      });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)));
    } catch (err) {
      console.error("Error updating todo:", err);
      setError("Failed to update todo");
    }
  };

  // DELETE
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Todo App</h1>

        {error && <p className="error">{error}</p>}

        <div className="input-row">
          <input
            className="todo-input"
            type="text"
            placeholder="Add a new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="primary-btn" onClick={handleAddTodo}>
            Add
          </button>
        </div>

        {todos.length === 0 ? (
          <p className="empty">No todos yet. Start by adding one above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <label className="todo-main">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo)}
                  />
                  <span className="todo-title">{todo.title}</span>
                </label>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
