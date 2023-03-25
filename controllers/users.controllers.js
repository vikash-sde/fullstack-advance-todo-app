import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  // console.log(req.query);

  const type = req.query.type;
  console.log(type);

  res.json({
    succcess: true,
    users: users,
  });
};

export const login = async (req, res) => {};
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    res.status(404).json({
      succcess: false,
      message: "user already exist",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 1000 * 10 * 15 })
      .json({
        succcess: true,
        message: "register successfully",
      });
  }
};

export const getUserDetails = async (req, res) => {
  // const { id } = req.query;
  const { id } = req.params;
  console.log(req.params);
  const user = await User.findById(id);

  res.json({ succcess: true, user: user });
};
