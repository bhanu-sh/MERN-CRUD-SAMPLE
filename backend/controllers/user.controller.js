import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) return res.status(409).send("User already registered.");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).send({
      message: "User registered successfully.",
    });
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};
