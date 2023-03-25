import { mongoose } from "mongoose";

const CONNECTION_URL =
  "mongodb+srv://user:user@socialmedia.nwmyj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

export const connectDB = () => {
  mongoose
    .connect(process.env.MOONGO_URL, { dbName: "backend" })
    .then(() => console.log("database connected"))
    .catch((e) => console.log(e));
};
