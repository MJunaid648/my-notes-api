import Joi from "joi";
import mongoose from "mongoose";

export const User = mongoose.model(
  "User",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 1024,
    },
  })
);

export function validateUser(user) {
  const schema =Joi.object( {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(user);}
