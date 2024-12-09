import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log("Connecting DB...");
  await connectDB(process.env.DATABASE_URL);
  console.log("DB Connected");
});
