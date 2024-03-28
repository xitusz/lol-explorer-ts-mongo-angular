import { Router } from "express";
import { validToken } from "../middlewares/createMiddleware";
const favoriteController = require("../controllers/favoriteController");

const router = Router();

router.post("/create", validToken, favoriteController.createFavorites);
router.get("/", validToken, favoriteController.listFavorites);
router.post("/", validToken, favoriteController.addFavorite);
router.delete("/", validToken, favoriteController.removeFavorite);
router.delete("/clear", validToken, favoriteController.clearFavorites);

export default router;
