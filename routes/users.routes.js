import express from "express";
import { User } from "../models/users.models.js";
import {
  getAllUsers,
  getUserDetails,
  login,
  register,
} from "../controllers/users.controllers.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/login", login);
router.post("/register", register);

router.route("/userid/:id").get(getUserDetails);

export default router;
