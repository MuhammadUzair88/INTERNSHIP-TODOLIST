import Todo from "../models/TodoModel.js";

// CREATE
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
      completed: req.body.completed ?? false, // default false if not provided
      user: req.userId,
    });

    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred in todo creation" });
  }
};

// READ (Get all todos for logged-in user)
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Todos Fetched Successfully", todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred in todo fetching" });
  }
};

// UPDATE
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId }, // ensures user can only update their own
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo Updated Successfully", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred in todo updating" });
  }
};

// DELETE
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }

    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error occurred in todo deletion" });
  }
};
