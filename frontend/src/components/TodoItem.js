import React from "react";

function TodoItem({ todo, updateTodo, deleteTodo }) {
  const handleToggle = () => {
    updateTodo(todo.id, { ...todo, completed: !todo.completed });
  };

  return (
    <li>
      <span
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.title}
      </span>
      <button onClick={handleToggle}>
        {todo.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default TodoItem;
