import mongoose from "mongoose";

export const connectDB = async (url: string | undefined) => {
  mongoose.Promise = Promise;
  mongoose.connect(url as string);
  mongoose.connection.on("error", (error: Error) => console.log(error));
};
