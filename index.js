import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import notesRouter from "./routes/notes.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

if (!process.env.jwtPrivateKey) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
