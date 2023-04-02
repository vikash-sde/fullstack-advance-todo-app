import express from "express";
import { User } from "../models/users.models.js";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteTask,
  getAllTask,
  newTask,
  updateTask,
} from "../controllers/task.controllers.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/all", isAuthenticated, getAllTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
