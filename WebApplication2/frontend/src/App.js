var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = "https://localhost:7015/api/todo";
function App() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [editTodo, setEditTodo] = useState(null);
    const fetchTodos = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield axios.get(API_URL);
        setTodos(res.data);
    });
    const addTodo = () => __awaiter(this, void 0, void 0, function* () {
        if (!newTitle.trim())
            return;
        yield axios.post(API_URL, { title: newTitle, isCompleted: false });
        setNewTitle("");
        fetchTodos();
    });
    const updateTodo = () => __awaiter(this, void 0, void 0, function* () {
        if (!editTodo.title.trim())
            return;
        yield axios.put(`${API_URL}/${editTodo.id}`, editTodo);
        setEditTodo(null);
        fetchTodos();
    });
    const deleteTodo = (id) => __awaiter(this, void 0, void 0, function* () {
        yield axios.delete(`${API_URL}/${id}`);
        fetchTodos();
    });
    useEffect(() => {
        fetchTodos();
    }, []);
    return (_jsxs("div", { className: "container mt-5", children: [_jsx("h2", { className: "mb-4", children: "\uD83D\uDCDD Todo App" }), _jsxs("div", { className: "mb-3 d-flex gap-2", children: [_jsx("input", { type: "text", className: "form-control", placeholder: "Add new todo...", value: newTitle, onChange: (e) => setNewTitle(e.target.value) }), _jsx("button", { className: "btn btn-primary", onClick: addTodo, children: "Add" })] }), editTodo && (_jsxs("div", { className: "mb-3 d-flex gap-2", children: [_jsx("input", { type: "text", className: "form-control", value: editTodo.title, onChange: (e) => setEditTodo(Object.assign(Object.assign({}, editTodo), { title: e.target.value })) }), _jsx("button", { className: "btn btn-success", onClick: updateTodo, children: "Update" }), _jsx("button", { className: "btn btn-secondary", onClick: () => setEditTodo(null), children: "Cancel" })] })), _jsx("ul", { className: "list-group", children: todos.map(todo => (_jsxs("li", { className: "list-group-item d-flex justify-content-between align-items-center", children: [_jsxs("span", { children: [_jsx("input", { type: "checkbox", className: "form-check-input me-2", checked: todo.isCompleted, onChange: () => {
                                        const updated = Object.assign(Object.assign({}, todo), { isCompleted: !todo.isCompleted });
                                        axios.put(`${API_URL}/${todo.id}`, updated).then(fetchTodos);
                                    } }), todo.title] }), _jsxs("div", { children: [_jsx("button", { className: "btn btn-sm btn-warning me-2", onClick: () => setEditTodo(todo), children: "Edit" }), _jsx("button", { className: "btn btn-sm btn-danger", onClick: () => deleteTodo(todo.id), children: "Delete" })] })] }, todo.id))) })] }));
}
export default App;
