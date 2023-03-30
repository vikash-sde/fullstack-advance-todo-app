import express from "express";
import { User } from "../models/users.models.js";

import { isAuthenticated } from "../middlewares/auth.js";
import { newTask } from "../controllers/task.controllers.js";

const router = express.Router();

router.post("/new", newTask);

export default router;
