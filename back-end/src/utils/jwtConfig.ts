import fs from "fs";
import path from "path";
import jwt, { Secret } from "jsonwebtoken";

const jwtSecret: Secret = fs.readFileSync(
  path.join(__dirname, "../../jwt.evaluation.key"),
);

const sign = (payload: string | object | Buffer): string => {
  try {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: "7d",
      algorithm: "HS256",
    });
  } catch (err) {
    throw new Error(`Erro ao assinar o token JWT: ${err}`);
  }
};

const verifyToken = (token: string): string | object => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new Error(`Erro ao verificar o token JWT: ${err}`);
  }
};

export { sign, verifyToken };
