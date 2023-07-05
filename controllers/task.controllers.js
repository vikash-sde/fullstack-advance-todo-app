import ErrorHandler from "../middlewares/error.js";
import { TaskModel } from "../models/tasks.models.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    //   const task = new Task({title})
    //   await task.save()

    await TaskModel.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await TaskModel.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await TaskModel.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await TaskModel.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Invalid Id", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
