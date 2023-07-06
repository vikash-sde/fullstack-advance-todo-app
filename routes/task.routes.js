import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteTask,
  getAllTask,
  newTask,
  updateTask,
} from "../controllers/task.controllers.js";

const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated, newTask);
taskRouter.get("/all", isAuthenticated, getAllTask);

taskRouter
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default taskRouter;

// module.exports = taskRouter;
