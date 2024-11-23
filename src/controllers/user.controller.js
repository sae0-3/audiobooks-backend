import bcrypt from "bcryptjs";
import {
  EmailExistsError,
  InvalidPasswordError,
  MissingCredentialsError,
  UserNotFoundError,
} from "../helpers/CustomError.js";
import { isValidPassword } from "../helpers/validatePassword.js";
import { getAccountByEmail, postAccount } from "../models/index.js";

export const createAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new MissingCredentialsError();

    const user = await getAccountByEmail(email);
    if (user) throw new EmailExistsError();

    if (!isValidPassword(password)) throw new InvalidPasswordError();

    const hashedPassword = await bcrypt.hash(password, 7);
    await postAccount({ email, password: hashedPassword });
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Error en la creación de la cuenta",
    });
  }
};

export const getProfile = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!req.user) throw new UserNotFoundError();

    res.status(200).json({ token, user: req.user });
  } catch (err) {
    console.error("CONTROLLER getProfile:", err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Error interno del servidor",
    });
  }
};
