import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

interface IRequest extends Request {
  user: { id: string };
}

const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { name, email, password /*recaptchaValue*/ } = req.body;

  try {
    const message = await userService.create(
      name,
      email,
      password,
      /*recaptchaValue,*/
    );

    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { email, password /*recaptchaValue*/ } = req.body;

  try {
    const data = await userService.login(email, password /*recaptchaValue*/);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getProfileInfo = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.user;

  try {
    const profileInfo = await userService.getProfileInfo(id);

    return res.status(200).json(profileInfo);
  } catch (err) {
    next(err);
  }
};

const updateName = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.user;
  const { newName } = req.body;

  try {
    const message = await userService.updateName(id, newName);

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

const updateEmail = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.user;
  const { newEmail } = req.body;

  try {
    const message = await userService.updateEmail(id, newEmail);

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.user;
  const { newPassword } = req.body;

  try {
    const message = await userService.updatePassword(id, newPassword);

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { id } = req.user;

  try {
    const message = await userService.deleteUser(id);

    return res.status(200).json({ message });
  } catch (err) {
    next(err);
  }
};

const validateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { newEmail } = req.body;

  try {
    const existingUser = await userService.validateEmail(newEmail);

    return res.status(200).json(existingUser);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
  getProfileInfo,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser,
  validateEmail,
};
