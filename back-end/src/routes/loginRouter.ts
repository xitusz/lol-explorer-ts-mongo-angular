import { Router } from "express";
const userController = require("../controllers/userController");

const router = Router();

router.post("/", userController.login);

export default router;
