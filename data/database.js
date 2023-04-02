import { mongoose } from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MOONGO_URL, { dbName: "backend" })
    .then((c) => console.log(`database connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
