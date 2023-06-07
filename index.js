import express from "express";
import mongoose from "mongoose";

import notesRouter from "./routes/notes.js";
import userRouter from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/notes", notesRouter);
app.use("/api/users", userRouter);

export const mongoConnect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://MJunaid:Juni%408808@cluster0.xaelvdg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err.message));
};

mongoConnect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
