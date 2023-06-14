import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import Joi from "joi";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = jwt.sign({ _id: user._id }, process.env.jwtPrivateKey);

  res.send(token);
});

export function Validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(req);
}
export default router;
