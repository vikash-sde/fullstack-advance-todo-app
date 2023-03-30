import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.status(404).json({
      succcess: false,
      message: "Invalid Email or Password",
    });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(404).json({
      succcess: false,
      message: "Invalid Email or Password",
    });

  sendCookies(user, res, `welcome back, ${user.name}`, 200);
};

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
    sendCookies(user, res, "register successfully", 201);
  }
};

export const getUserDetails = async (req, res) => {
  res.status(200).json({ succcess: true, user: req.user });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({ succcess: true, user: req.user });
};
