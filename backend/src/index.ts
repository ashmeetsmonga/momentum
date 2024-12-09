import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB";
import userRouter from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log("Connecting DB...");
  await connectDB(process.env.DATABASE_URL);
  console.log("DB Connected");
});
