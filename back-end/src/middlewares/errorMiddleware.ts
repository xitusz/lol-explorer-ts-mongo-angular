import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next): void => {
  res.status(err.statusCode).json({ message: err.message });
};

export default errorMiddleware;
