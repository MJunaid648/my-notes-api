import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  mongoose.Schema({
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  })
);

export default User;