import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/TodoController.js";
import { ProtectedRoute } from "../jwt/Protected.js";


const router = express.Router();

// Routes
router.post("/", ProtectedRoute, createTodo);           // Create a new todo
router.get("/", ProtectedRoute, getTodos);              // Get all todos for logged-in user
router.put("/:id", ProtectedRoute, updateTodo);         // Update a todo
router.delete("/:id", ProtectedRoute, deleteTodo);      // Delete a todo

export default router;
