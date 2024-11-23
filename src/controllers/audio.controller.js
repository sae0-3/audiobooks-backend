import {
  AccessDeniedError,
  InvalidAudiobookIDError,
  MissingCredentialsError,
} from "../helpers/CustomError.js";
import {
  deleteLibrary as delLib,
  getAudioById as getAudio,
  getAudioByGenre,
  getAudioAll as getAudios,
  getGenreAll as getGenres,
  getLibrary as getLib,
  postLibrary as postLib,
} from "../models/index.js";

export const getAudioAll = async (req, res) => {
  const { genre, search } = req.query;

  try {
    const startTime = Date.now();
    const audios = !genre ? await getAudios(search) : getAudioByGenre(genre);
    const executionTime = Date.now() - startTime;

    res.status(200).json({
      executionTime: `${executionTime}ms`,
      count: audios.length,
      content: audios,
    });
  } catch (err) {
    console.error("CONTROLLER getAudioAll:", err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || "Error interno del servidor",
    });
  }
};

export const getAudioById = async (req, res) => {
  const id = req.params.id;

  try {
    if (isNaN(id)) throw new InvalidAudiobookIDError();

    const audio = await getAudio(id, req.user.id);

    if (!audio) throw new AudiobookNotFoundError();

    res.status(200).json(audio);
  } catch (err) {
    console.error('CONTROLLER getAudioById:', err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    });
  }
};

export const getLibrary = async (req, res) => {
  try {
    if (!req.user) throw new AccessDeniedError();

    const startTime = Date.now();
    const audios = await getLib(req.user.id);
    const executionTime = Date.now() - startTime;

    res.status(200).json({
      executionTime: `${executionTime}ms`,
      count: audios.length,
      content: audios,
    });
  } catch (err) {
    console.error('CONTROLLER getLibrary:', err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    });
  }
};

export const getGenreAll = async (req, res) => {
  try {
    const startTime = Date.now();
    const genres = await getGenres();
    const executionTime = Date.now() - startTime;

    res.status(200).json({
      executionTime: `${executionTime}ms`,
      count: genres.length,
      content: genres,
    });
  } catch (err) {
    console.error('CONTROLLER getGenreAll:', err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    });
  }
};

export const postLibrary = async (req, res) => {
  const { id_audio } = req.body

  try {
    if (!req.user) throw new AccessDeniedError();
    if (!id_audio) throw new MissingCredentialsError();

    await postLib(req.user.id, id_audio);

    res.status(201).send("Saved in the library");
  } catch (err) {
    console.error('CONTROLLER postLibrary:', err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    });
  }
};

export const deleteLibrary = async (req, res) => {
  const { id_audio } = req.body

  try {
    if (!req.user) throw new AccessDeniedError();
    if (!id_audio) throw new MissingCredentialsError();

    await delLib(req.user.id, id_audio);

    res.status(201).send("Removed from library");
  } catch (err) {
    console.error('CONTROLLER deleteLibrary:', err);
    res.status(err.statusCode || 500).json({
      statusCode: err.statusCode || 500,
      message: err.message || 'Error interno del servidor',
    });
  }
};
