import { verifyToken } from "../utils/jwtConfig";
import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

interface IRequest extends Request {
  user?: string | JwtPayload;
}

const validEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { email } = req.body;

  const regex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/gi;

  if (!regex.test(email)) {
    return res.status(401).json({ message: "Insira um email válido" });
  }

  next();
};

const validPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { password } = req.body;

  if (password.length < 6 || password.length > 12) {
    return res
      .status(401)
      .json({ message: "A senha deve ter de 6 a 12 caracteres" });
  }

  next();
};

const validName = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { name } = req.body;

  if (name.length < 2) {
    return res
      .status(401)
      .json({ message: "O nome deve ter pelo menos 2 caracteres" });
  }

  next();
};

const validToken = (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(401).json({ message: "Token não encontrado" });
    }

    const token = verifyToken(authorization);
    req.user = token;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token expirado ou inválido" });
  }
};

export { validEmail, validPassword, validName, validToken };
