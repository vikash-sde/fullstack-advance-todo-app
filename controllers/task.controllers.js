import { Task } from "../models/tasks.models.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  //   const task = new Task({title})
  //   await task.save()

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task added sucessfully",
  });
};

export const getAllTask = async (req, res, next) => {
  const userid = req.user._id;

  const tasks = await Task.find({ user: userid });

  res.status(200).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated",
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted",
  });
};
