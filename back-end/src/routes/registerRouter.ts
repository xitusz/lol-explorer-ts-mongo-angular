import { Router } from "express";
import {
  validName,
  validEmail,
  validPassword,
} from "../middlewares/createMiddleware";
const userController = require("../controllers/userController");

const router = Router();

router.post("/", validName, validEmail, validPassword, userController.create);

export default router;
