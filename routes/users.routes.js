import express from "express";
import {
  getUserDetails,
  login,
  logout,
  register,
} from "../controllers/users.controllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/me", isAuthenticated, getUserDetails);

export default router;
