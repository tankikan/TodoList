
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "https://localhost:7015/api/todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    await axios.post(API_URL, { title: newTitle, isCompleted: false });
    setNewTitle("");
    fetchTodos();
  };

  const updateTodo = async () => {
    if (!editTodo.title.trim()) return;
    await axios.put(`${API_URL}/${editTodo.id}`, editTodo);
    setEditTodo(null);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📝 Todo App</h2>
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Add new todo..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTodo}>Add</button>
      </div>

      {editTodo && (
        <div className="mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            value={editTodo.title}
            onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
          />
          <button className="btn btn-success" onClick={updateTodo}>Update</button>
          <button className="btn btn-secondary" onClick={() => setEditTodo(null)}>Cancel</button>
        </div>
      )}

      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={todo.isCompleted}
                onChange={() => {
                  const updated = { ...todo, isCompleted: !todo.isCompleted };
                  axios.put(`${API_URL}/${todo.id}`, updated).then(fetchTodos);
                }}
              />
              {todo.title}
            </span>
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => setEditTodo(todo)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
