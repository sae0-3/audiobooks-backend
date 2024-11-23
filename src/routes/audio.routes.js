import { Router } from "express";
import {
  deleteLibrary,
  getAudioAll,
  getAudioById,
  getGenreAll,
  getLibrary,
  postLibrary,
} from "../controllers/index.js";
import passport from "../middlewares/passport.js";

const audioRoutes = Router();

audioRoutes.get("/", getAudioAll);
audioRoutes.get("/library", passport.authenticate("jwt", { session: false }), getLibrary);
audioRoutes.post("/library", passport.authenticate("jwt", { session: false }), postLibrary);
audioRoutes.delete("/library", passport.authenticate("jwt", { session: false }), deleteLibrary);
audioRoutes.get("/genres", getGenreAll);
audioRoutes.get("/:id", passport.authenticate("jwt", { session: false }), getAudioById);

export default audioRoutes;
