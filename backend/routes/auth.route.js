import express from "express";
import { User } from "../models/user.model.js";
import Joi from "joi";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(401).send({ message: "Invalid username or password." });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword)
      return res.status(401).send({ message: "Invalid username or password." });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Login successful." });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong." });
  }
});

const validate = (user) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"), // Changed from email to string
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(user);
};

export default router;
