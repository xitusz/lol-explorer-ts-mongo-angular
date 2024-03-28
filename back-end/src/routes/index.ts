import { Router } from "express";
import registerRouter from "./registerRouter";
import loginRouter from "./loginRouter";
import favoriteRouter from "./favoriteRouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/favorites", favoriteRouter);
router.use("/profile", userRouter);

export default router;
