import { User } from "../models/users.models.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 404));

    sendCookies(user, res, `welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("user already exist", 404));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      sendCookies(user, res, "register successfully", 201);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res) => {
  res.status(200).json({ succcess: true, user: req.user });
};

export const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? "false" : "true",
    })
    .json({ succcess: true, user: req.user });
};
