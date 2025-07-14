import express from "express";
import { Login, signUp } from "../controllers/UserController.js";


const router = express.Router();

// Register a new user
router.post("/signup", signUp);

// Login existing user
router.post("/login", Login);

export default router;
