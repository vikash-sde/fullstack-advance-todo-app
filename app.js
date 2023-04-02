import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRoutes from "./routes/users.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";

export const app = express();
dotenv.config({
  path: "./data/config.env",
});
//Using Middlewares
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//Using Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRoutes);

app.get("/", (req, res) => {
  res.send("nice work");
});

app.use(errorMiddleware);
