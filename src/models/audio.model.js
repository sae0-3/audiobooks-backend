import pool from "../database/database.js";
import { InternalServerError } from "../helpers/CustomError.js";
import pgErrors from "../helpers/pgErrors.js";

export const getAudioAll = async (search) => {
  const query = `
    SELECT id, title, author, duration, description, cover, link
    FROM AUDIO
    WHERE ${search ? "title ~* $1 OR author ~* $1 OR description ~* $1" : "TRUE"}
  `;
  const params = search ? [search] : [];

  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    console.error("MODEL getAudioAll:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const getAudioById = async (id_audio, id_account) => {
  const query = `
    SELECT
      a.id,
      a.title,
      a.author,
      a.duration,
      a.description,
      a.cover,
      a.link
      ${id_account ? ", CASE WHEN l.id_audio IS NOT NULL THEN TRUE ELSE FALSE END AS is_saved" : ""}
    FROM AUDIO a
      ${id_account ? "LEFT JOIN LIBRARY l ON l.id_audio = a.id AND l.id_account = $2" : ""}
    WHERE a.id = $1
  `;
  const params = id_account ? [id_audio, id_account] : [id_audio];

  try {
    const result = await pool.query(query, params);
    return result.rows[0];
  } catch (err) {
    console.error("MODEL getAudioById:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const getAudioByGenre = async (id_genre) => {
  const query = `
    SELECT
      a.id, a.title, a.author, a.duration, a.description, a.cover, a.link
    FROM R_AUDIO_GENRE rag
      JOIN AUDIO a on a.id = rag.id_audio
    WHERE rag.id_genre = $1
  `;

  try {
    const result = await pool.query(query, [id_genre]);
    return result.rows;
  } catch (err) {
    console.error("MODEL getAudioByGenre:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const getLibrary = async (id_account) => {
  const query = `
    SELECT
      a.id, a.title, a.author, a.duration, a.description, a.cover, a.link, l.progress, l.saved_at
    FROM LIBRARY l
      JOIN AUDIO a on l.id_audio = a.id
    WHERE l.id_account = $1
    ORDER BY l.saved_at DESC
  `;

  try {
    const result = await pool.query(query, [id_account]);
    return result.rows;
  } catch (err) {
    console.error("MODEL getLibrary:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const getGenreAll = async () => {
  const query = "SELECT * FROM GENRE";

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error("MODEL getGenreAll:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const postLibrary = async (id_account, id_audio, progress) => {
  const query = progress
    ? "INSERT INTO LIBRARY (id_account, id_audio, progress) VALUES ($1, $2, $3)"
    : "INSERT INTO LIBRARY (id_account, id_audio) VALUES ($1, $2)";
  const params = progress ? [id_account, id_audio, progress] : [id_account, id_audio];

  try {
    const result = await pool.query(query, params);
    console.log(result);
  } catch (err) {
    console.error("MODEL postLibrary:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
};

export const deleteLibrary = async (id_account, id_audio) => {
  const query = "DELETE FROM LIBRARY WHERE id_account = $1 AND id_audio = $2";

  try {
    const result = await pool.query(query, [id_account, id_audio]);
    console.log(result);
  } catch (err) {
    console.error("MODEL deleteLibrary:", err);
    throw pgErrors[err.code] || new InternalServerError();
  }
}
