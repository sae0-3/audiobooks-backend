import pool from "../database/database.js";
import { InternalServerError } from "../helpers/CustomError.js";
import pgErrors from "../helpers/pgErrors.js";

export const postAccount = async (user) => {
  const query = "INSERT INTO ACCOUNT (email, password) VALUES ($1, $2)";
  const { email, password } = user;

  try {
    const result = await pool.query(query, [email, password]);
    console.log(result);
  } catch (err) {
    console.error("MODEL postAccount:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const getAccountByEmail = async (email) => {
  const query = "SELECT id, name, lastname, username, email, password, created_at FROM ACCOUNT WHERE email = $1";

  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (err) {
    console.error("MODEL getAccountByEmail:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const getAccountById = async (id) => {
  const query = "SELECT id, name, lastname, username, email, created_at FROM ACCOUNT WHERE id = $1";

  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (err) {
    console.error("MODEL getAccountById:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};
